import { Navigate, Outlet, Route } from "react-router-dom";

// import { useContext } from "react";
// import AuthContext from "../components/Context/AuthContext";

const PrivateRoute = () => {
  // const contextConsumer = useContext(AuthContext);

  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;

  // return contextConsumer.privateData ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
