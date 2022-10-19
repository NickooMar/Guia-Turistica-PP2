import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home, Login, Register, Handle404 } from "./components";

import PrivateRoute from "./lib/PrivateRoute";

import { myContext } from "./components/Context";

function App() {
  const contextConsumer = useContext(myContext);

  console.log(contextConsumer);

  return (
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
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
