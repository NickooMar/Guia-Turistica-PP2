import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  //Logout User
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
