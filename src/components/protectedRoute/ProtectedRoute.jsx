import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthUser } from "../../store/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectAuthUser);

  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
