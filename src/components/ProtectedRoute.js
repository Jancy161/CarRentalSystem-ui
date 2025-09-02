import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../services/authService";

export default function ProtectedRoute({ children, roles }) {
  const authed = isAuthenticated();
  const role = getRole();

  if (!authed) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}