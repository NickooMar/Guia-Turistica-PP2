import React, { Fragment, useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home, Login, Register } from "./components";

import { myContext } from "./components/Context";

function App() {
  const ctx = useContext(myContext);
  
  const userContext = ctx.user;
  console.log(userContext)

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
