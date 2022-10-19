import { Navigate, Outlet, Route } from "react-router-dom";

import { useContext } from "react";
import { myContext } from "../components/Context";

const PrivateRoute = () => {
  const contextConsumer = useContext(myContext);

  // let token = localStorage.getItem("token");

  // return token ? <Outlet /> : <Navigate to="/" />;

  // return contextConsumer.privateData ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
