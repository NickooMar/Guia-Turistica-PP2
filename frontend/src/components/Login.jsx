import React, { useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();


  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const habdleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event?.target?.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = user;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post(
      "http://localhost:4000/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
      config
    )
    .then((res) => {
      if(res.data === "success") {
        navigate("/home");
      }
    },
    () => {
      toast.error("Email o contraseña incorrectos");
    } 
    )
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <div className="grid h-screen place-items-center">
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
          <h4 className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Login
          </h4>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-6 text-2xl font-normal mr-8 tracking-tight text-gray-900 dark:text-white">
              Ingrese su email y contraseña
            </h5>

            <div id="emailInputReference">
              <p className="mb-1 font-normal text-gray-500 dark:text-gray-200">
                Email
              </p>

              <div className="relative mr-2">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  id="emailInput"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Juan@gmail.com"
                  onChange={habdleInputChange}
                />
              </div>
            </div>

            <div id="passwordInputReference">
              <p className="mb-1 mt-4 font-normal text-gray-500 dark:text-gray-200">
                Contraseña
              </p>
              <div className="relative mr-2">
                <div className="flex absolute inset-y-0 left-0 items-center pl-2.5 pb-1 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="passwordInput"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  onChange={habdleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-6 px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Ingresar
            </button>
            <h1 className="text-white mt-2">No tienes cuenta?</h1>
            <button
              type="button"
              className="bg-slate-300 hover:bg-slate-300 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 mb-2 dark:bg-slate-300 dark:hover:bg-slate-300 focus:outline-none dark:focus:ring-slate-300"
            >
              <Link to="/register">Registrarse</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
