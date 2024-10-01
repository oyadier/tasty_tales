import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider mounted");
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <AuthContext.Provider value={{ handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
