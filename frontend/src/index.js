import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Context from "./components/Context";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <React.StrictMode>
      <Context>
        <App />
      </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
