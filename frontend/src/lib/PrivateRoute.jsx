import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../components/Context/AuthContext";

const PrivateRoute = () => {

  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;

};

export default PrivateRoute;
