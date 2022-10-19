import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";

import Context from "./components/Context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
