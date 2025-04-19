import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";

import Form from "../pages/Form";
import User from "../pages/User";
import Users from "../pages/Users";
import ErrorPage from "../pages/ErrorPage";
import store from "../store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import { CssVarsProvider } from "@mui/joy/styles";
import theme from "../theme";
import { logIn } from "../store/slices/authSlice";

const Root = () => {
  return (
    <div className="page">
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser && !currentUser) {
      dispatch(logIn(JSON.parse(storedUser)));
    }
  }, [dispatch, currentUser]);

  return (
    <Provider store={store}>
      <CssVarsProvider theme={theme} defaultMode="light">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Form />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users/:id"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CssVarsProvider>
    </Provider>
  );
}

export default App;
