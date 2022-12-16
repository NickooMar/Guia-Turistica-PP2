import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home, Login, Register, Handle404, Perfil, Actualizar } from "./components";

import PrivateRoute from "./lib/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/actualizar" element={<Actualizar />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Handle404 />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
