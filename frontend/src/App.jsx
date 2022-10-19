import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home, Login, Register, Handle404 } from "./components";

import PrivateRoute from "./lib/PrivateRoute";

import AuthContext from "./components/Context/AuthContext";
import { AuthProvider } from "./components/Context/AuthProvider";
import Perfil from "./components/Perfil";

function App() {
  // const contextConsumer = useContext(AuthContext);

  // console.log(contextConsumer);

  return (
    <>
      {/* <BrowserRouter> */}
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Handle404 />} />
      </Routes>
      <ToastContainer />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
