import { Button, Input, Table } from "@mui/joy";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllUsers, editUser } from "../store/slices/usersSlice";
import CreateUserModal from "../components/modalUsers/createUserModal/CreateUserModal";
import { logOut } from "../store/slices/authSlice";
import PageContainer from "../components/PageContainer";
import UsersHeader from "../components/header/UsersHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowCreateUserModal, setIsShowCreateUserModal] = useState(false);
  const [isEditableMode, setIsEditableMode] = useState(false);
  const [editableUser, setEditableUser] = useState(false);
  const { id } = useParams();
  const users = useSelector(selectAllUsers);
  const user = users.find((u) => u.id === id);
  const currentUser = useSelector((state) => state.auth.user);
  const [redirecting, setRedirecting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const redirectTimeout = useRef(null);

  const onEditMode = () => {
    setIsEditableMode(true);
    setEditableUser(user);
  };

  const onChangeHandler = (value, prop) => {
    setEditableUser({ ...editableUser, [prop]: value });
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

  const onSave = () => {
    setIsEditableMode(false);
    dispatch(editUser(editableUser));
    toast.success("The user details were successfully changed!");
  };

  const handleCreateUserSuccess = () => {
    setIsShowCreateUserModal(false);
    toast.success("New user was successfully created!");
  };

  const handleCreateUserError = (error) => {
    toast.error(`Error creating new user: ${error.message || "Unknown user"}`);
  };

  const openCreateUserModal = () => {
    setIsShowCreateUserModal(true);
  };

  return (
    <>
      <PageContainer>
        <div className="container">
          <UsersHeader currentUser={currentUser} onLogout={handleLogout} />
          <div className="main">
            <Table
              hoverRow
              size="lg"
              borderAxis="both"
              aria-label="basic table"
              sx={{
                "& thead th:nth-child(1)": { width: "20%" },
                "& thead th:nth-child(5)": { width: "15%" },

                "--Table-headerUnderlineThickness": "10px",
                "--TableCell-height": "50px",
                "--TableCell-paddingX": "15px",
                "--TableCell-paddingY": "15px",
              }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USERNAME</th>
                  <th>PASSWORD</th>
                  <th>EMAIL</th>
                  <th>EDIT</th>
                </tr>
              </thead>
              <tbody>
                {isEditableMode ? (
                  <tr>
                    <td>{editableUser.id}</td>
                    <td>
                      <Input
                        value={editableUser.name}
                        onChange={(e) =>
                          onChangeHandler(e.target.value, "name")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        value={editableUser.pass}
                        onChange={(e) =>
                          onChangeHandler(e.target.value, "pass")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        value={editableUser.email}
                        onChange={(e) =>
                          onChangeHandler(e.target.value, "email")
                        }
                      />
                    </td>
                    <td>
                      <div className="edit-btns">
                        <Button onClick={onSave} color="success">
                          Ok
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setIsEditableMode(false)}
                        >
                          X
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td data-label="ID:">{user.id}</td>
                    <td data-label="Username:">{user.name}</td>
                    <td data-label="Password:">{user.pass}</td>
                    <td data-label="Email:">{user.email}</td>
                    <td data-label="Edit:">
                      <Button
                        variant="outlined"
                        color="success"
                        size="md"
                        onClick={onEditMode}
                      >
                        Edit user
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="bottom-block">
            <div className="links">
              <Button variant="outlined">
                <Link to={"/users"}>View all users</Link>
              </Button>
            </div>
            <div className="links">
              <Button onClick={openCreateUserModal} variant="soft" size="lg">
                Create a new user
              </Button>
            </div>
          </div>
          <Footer />
          {isShowCreateUserModal && (
            <CreateUserModal
              onDestroy={() => setIsShowCreateUserModal(false)}
              onCreateSuccess={handleCreateUserSuccess}
              onCreateError={handleCreateUserError}
            />
          )}
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

export default User;
