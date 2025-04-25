import UsersHeader from "../components/header/UsersHeader";
import Pagination from "../components/pagination/Pagination";
import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/joy/Table";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, selectAllUsers } from "../store/slices/usersSlice";
import RemoveUserModal from "../components/modalUsers/removeUserModal/RemoveUserModal";
import CreateUserModal from "../components/modalUsers/createUserModal/CreateUserModal";
import { logOut } from "../store/slices/authSlice";
import PageContainer from "../components/PageContainer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@mui/joy";
import Footer from "../components/footer/Footer";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allUsers = useSelector(selectAllUsers);
  const [isShowRemoveUserModal, setIsShowRemoveUserModal] = useState(false);
  const [isShowCreateUserModal, setIsShowCreateUserModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const usersPerPage = 5;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(allUsers.length / usersPerPage)
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const redirectTimeout = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const openRemoveUserModal = (id) => {
    setIsShowRemoveUserModal(true);
    setUserIdToDelete(id);
  };

  const onRemoveUser = (id) => {
    dispatch(removeUser(id));
    setIsShowRemoveUserModal(false);
    toast.success("User was successfully deleted!");
  };

  const handleCreateUserSuccess = () => {
    setIsShowCreateUserModal(false);
    toast.success("New user was seccessfully created!");
  };

  const handleCreateUserError = (error) => {
    toast.error(`Error creating new user: ${error.message || "Unknown error"}`);
  };

  const openCreateUserModal = () => {
    setIsShowCreateUserModal(true);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    dispatch(logOut());
    localStorage.removeItem("currentUser");
    localStorage.removeItem("users");
    navigate("/");
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
      redirectTimeout.current = null;
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const results = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
    setTotalPages(Math.ceil(results.length / usersPerPage));
    setCurrentPage(1);
  }, [allUsers, searchQuery, usersPerPage]);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredUsers.length / usersPerPage);
    setTotalPages(newTotalPages);

    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }
  }, [filteredUsers, usersPerPage, currentPage]);

  return (
    <>
      <PageContainer>
        <div className="container">
          <UsersHeader currentUser={currentUser} onLogout={handleLogout} />
          <div className="main">
            <div className="search-bar" style={{ marginBottom: "20px" }}>
              <Input
                placeholder="Search by username or email"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="sm"
                sx={{ width: "310px" }}
              />
            </div>
            <Table
              hoverRow
              className="hide-id-mobile"
              stickyHeader
              size="sm"
              borderAxis="both"
              aria-label="basic table"
              sx={{
                "& thead th:nth-child(1)": { width: "5%" },
                "& thead th:nth-child(2)": { width: "10%" },
                "& thead th:nth-child(6)": { width: "10%" },
                "& thead th:nth-child(7)": { width: "10%" },
                "--Table-headerUnderlineThickness": "10px",
                "--TableCell-height": "40px",
                "--TableCell-paddingX": "10px",
                "--TableCell-paddingY": "10px",
              }}
            >
              <thead>
                <tr>
                  <th>№</th>
                  <th>ID</th>
                  <th>USERNAME</th>
                  <th>PASSWORD</th>
                  <th>EMAIL</th>
                  <th>PROFILE</th>
                  <th>DESTROY</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((u, index) => {
                  const rowNumber = indexOfFirstUser + index + 1;
                  return (
                    <tr key={u.id}>
                      <td data-label="№">{rowNumber}</td>
                      <td data-label="ID">{u.id}</td>
                      <td data-label="Username:">{u.name}</td>
                      <td data-label="Password:">{u.pass}</td>
                      <td data-label="Email:">{u.email}</td>
                      <td data-label="All info:">
                        <Link to={`/users/${u.id}`}>View profile</Link>
                      </td>
                      <td data-label="Delete:">
                        <Button
                          onClick={() => openRemoveUserModal(u.id)}
                          size="sm"
                          color="danger"
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            {isShowRemoveUserModal && (
              <RemoveUserModal
                onConfirm={() => onRemoveUser(userIdToDelete)}
                onDestroy={() => setIsShowRemoveUserModal(false)}
              />
            )}
            {isShowCreateUserModal && (
              <CreateUserModal
                onDestroy={() => setIsShowCreateUserModal(false)}
                onCreateSuccess={handleCreateUserSuccess}
                onCreateError={handleCreateUserError}
              />
            )}
          </div>
          <div className="bottom-block">
            <div className="links">
              <div className="create-link">
                <Button
                  onClick={openCreateUserModal}
                  variant="outlined"
                  size="sm"
                >
                  Create a new user
                </Button>
              </div>
            </div>
            <div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={paginate}
              />
            </div>
          </div>
          <Footer />
        </div>
      </PageContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Users;

// import UsersHeader from "../components/header/UsersHeader";
// import Pagination from "../components/pagination/Pagination";
// import React, { useState, useEffect, useRef } from "react";
// import Table from "@mui/joy/Table";
// import { Button } from "@mui/joy";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { removeUser, selectAllUsers } from "../store/slices/usersSlice";
// import RemoveUserModal from "../components/modalUsers/removeUserModal/RemoveUserModal";
// import CreateUserModal from "../components/modalUsers/createUserModal/CreateUserModal";
// import { logOut } from "../store/slices/authSlice";
// import PageContainer from "../components/PageContainer";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Input } from "@mui/joy";
// import Footer from "../components/footer/Footer";

// const Users = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const allUsers = useSelector(selectAllUsers);
//   const [isShowRemoveUserModal, setIsShowRemoveUserModal] = useState(false);
//   const [isShowCreateUserModal, setIsShowCreateUserModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState(null);
//   const currentUser = useSelector((state) => state.auth.user);
//   const usersPerPage = 5;
//   const [totalPages, setTotalPages] = useState(
//     Math.ceil(allUsers.length / usersPerPage)
//   );
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const redirectTimeout = useRef(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(allUsers);

//   const [currentPage, setCurrentPage] = useState(1);
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const usersContainerRef = useRef(null); // Створюємо референс

//   const openRemoveUserModal = (id) => {
//     setIsShowRemoveUserModal(true);
//     setUserIdToDelete(id);
//   };

//   const onRemoveUser = (id) => {
//     dispatch(removeUser(id));
//     setIsShowRemoveUserModal(false);
//     toast.success("User was successfully deleted!");
//   };

//   const handleCreateUserSuccess = () => {
//     setIsShowCreateUserModal(false);
//     toast.success("New user was seccessfully created!");
//   };

//   const handleCreateUserError = (error) => {
//     toast.error(`Error creating new user: ${error.message || "Unknown error"}`);
//   };

//   const openCreateUserModal = () => {
//     setIsShowCreateUserModal(true);
//   };

//   const handleLogout = () => {
//     setIsLoggingOut(true);
//     dispatch(logOut());
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("users");
//     navigate("/");
//     if (redirectTimeout.current) {
//       clearTimeout(redirectTimeout.current);
//       redirectTimeout.current = null;
//     }
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     if (usersContainerRef.current) {
//       usersContainerRef.current.scrollTop = 0;
//     } else {
//       window.scrollTo(0, 0);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   useEffect(() => {
//     const results = allUsers.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredUsers(results);
//     setTotalPages(Math.ceil(results.length / usersPerPage));
//     setCurrentPage(1);
//   }, [allUsers, searchQuery, usersPerPage]);

//   useEffect(() => {
//     const newTotalPages = Math.ceil(filteredUsers.length / usersPerPage);
//     setTotalPages(newTotalPages);

//     if (currentPage > newTotalPages && newTotalPages > 0) {
//       setCurrentPage(newTotalPages);
//     } else if (newTotalPages === 0) {
//       setCurrentPage(1);
//     }
//   }, [filteredUsers, usersPerPage, currentPage]);

//   return (
//     <>
//       <PageContainer>
//         <div className="container">
//           <UsersHeader currentUser={currentUser} onLogout={handleLogout} />
//           <div className="main" ref={usersContainerRef}>
//             {" "}
//             {/* Призначаємо референс */}
//             <div className="search-bar" style={{ marginBottom: "20px" }}>
//               <Input
//                 placeholder="Search by username or email"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 variant="outlined"
//                 size="sm"
//                 sx={{ width: "310px" }}
//               />
//             </div>
//             <Table
//               hoverRow
//               className="hide-id-mobile"
//               stickyHeader
//               size="md"
//               borderAxis="both"
//               aria-label="basic table"
//               sx={{
//                 "& thead th:nth-child(1)": { width: "5%" },
//                 "& thead th:nth-child(2)": { width: "20%" },
//                 "& thead th:nth-child(6)": { width: "10%" },
//                 "& thead th:nth-child(7)": { width: "8%" },
//                 "--Table-headerUnderlineThickness": "10px",
//                 "--TableCell-height": "30px",
//                 "--TableCell-paddingX": "10px",
//                 "--TableCell-paddingY": "10px",
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th>ID</th>
//                   <th>USERNAME</th>
//                   <th>PASSWORD</th>
//                   <th>EMAIL</th>
//                   <th>PROFILE</th>
//                   <th>DESTROY</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUsers.map((u, index) => {
//                   const rowNumber = indexOfFirstUser + index + 1;
//                   return (
//                     <tr key={u.id}>
//                       <td data-label="№">{rowNumber}</td>
//                       <td data-label="ID">{u.id}</td>
//                       <td data-label="Username:">{u.name}</td>
//                       <td data-label="Password:">{u.pass}</td>
//                       <td data-label="Email:">{u.email}</td>
//                       <td data-label="All info:">
//                         <Link to={`/users/${u.id}`}>View profile</Link>
//                       </td>
//                       <td data-label="Delete:">
//                         <Button
//                           onClick={() => openRemoveUserModal(u.id)}
//                           size="sm"
//                           color="danger"
//                         >
//                           X
//                         </Button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//             {isShowRemoveUserModal && (
//               <RemoveUserModal
//                 onConfirm={() => onRemoveUser(userIdToDelete)}
//                 onDestroy={() => setIsShowRemoveUserModal(false)}
//               />
//             )}
//             {isShowCreateUserModal && (
//               <CreateUserModal
//                 onDestroy={() => setIsShowCreateUserModal(false)}
//                 onCreateSuccess={handleCreateUserSuccess}
//                 onCreateError={handleCreateUserError}
//               />
//             )}
//           </div>
//           <div className="bottom-block">
//             <div className="links">
//               <div className="create-link">
//                 <Button
//                   onClick={openCreateUserModal}
//                   variant="outlined"
//                   size="lg"
//                 >
//                   Create a new user
//                 </Button>
//               </div>
//             </div>
//             <div>
//               <Pagination
//                 totalPages={totalPages}
//                 currentPage={currentPage}
//                 onPageChange={paginate}
//               />
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </PageContainer>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// };

// export default Users;
