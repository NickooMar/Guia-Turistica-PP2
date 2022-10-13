import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate ();

  const initialState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialState);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event?.target?.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const { email, username, password, confirmPassword } = user;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password === confirmPassword) {
      axios
        .post(
          "http://localhost:4000/register",
          {
            email,
            username,
            password,
            confirmPassword,
          },
          {
            withCredentials: true,
          },
          config
        )
        .then((res) => {
          if (res.data === "success") {
            toast.success('Su usuario ha sido creado!')
            navigate("/");
          } else {
            setUser(initialState);
            toast.error("El usuario o email ya existe");
          }
        });
    } else {
      setUser(initialState);
      toast.error("Las contraseñas no coinciden");
    }
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <div className="grid h-screen place-items-center">
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
          <h4 className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Register
          </h4>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-normal mr-8 tracking-tight text-gray-900 dark:text-white">
              Ingrese su email y contraseña
            </h5>

            <div id="emailInputReference">
              <p className="mb-1  mt-4  font-normal text-gray-500 dark:text-gray-200">
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
                  className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Juan@gmail.com"
                  onChange={handleInputChange} />

              </div>
            </div>

            <div id="usernameInputReference">
              <p className="mb-1  mt-4  font-normal text-gray-500 dark:text-gray-200">
                Nombre de Usario
              </p>

              <div className="relative mr-2">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="usernameInput"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre de usuario"
                  onChange={handleInputChange}
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
                  placeholder="Contraseña"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div id="confirmPasswordInputReference">
              <p className="mb-1 mt-4 font-normal text-gray-500 dark:text-gray-200">
                Confirmar Contraseña
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
                  id="confirmPasswordInput"
                  name="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirmar Contraseña"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-6 px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
