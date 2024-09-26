import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [cookies] = useCookies(["token"]);
  if (!cookies.token || cookies.token === "undefined") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
