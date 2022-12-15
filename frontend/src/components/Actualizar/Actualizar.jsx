import React, { useContext, useState } from "react";

import { CssBaseline, Button, Paper } from "@material-ui/core";
import Header from "../Header/Header";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import AuthContext from "../Context/AuthContext";

import { toast } from "react-toastify";

const Actualizar = () => {
  const { user, logoutHandler } = useContext(AuthContext);

  const navigate = useNavigate();
  const initialState = {
    id: user?._id,
    username: user?.username,
    email: user?.email,
  };
  const [updatedUser, setUpdatedUser] = useState(initialState);

  const habdleInputChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event?.target?.value,
    });
  };

  function handleSubmit(e) {
    const { id, username, email } = updatedUser;

    e.preventDefault();

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      axios
        .patch(
          "http://localhost:4000/user",
          {
            id,
            username,
            email,
          },
          {
            withCredentials: true,
          },
          config
        )
        .then((data) => {
          navigate("/home");
          toast.success("Usuario Actualizado Correctamente");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Pruebe con un email no existente");
        });
    } catch (error) {
      console.log(error);
      setTimeout(() => {}, 5000);
      navigate("/home");
    }
  }

  function handleDeleteUser() {
    const { id } = updatedUser;

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    if (
      window.confirm(
        `¿Seguro que quieres eliminar el usuario ${updatedUser?.username}?`
      )
    ) {
      try {
        axios
          .delete(
            "http://localhost:4000/user",
            {
              data: { id },
            },
            {
              withCredentials: true,
            },
            config
          )
          .then((data) => {
            logoutHandler();
            setTimeout(() => {}, 5000);
            toast.success("Usuario Eliminado Correctamente");
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <CssBaseline />
      <Header />

      <div class="bg-blue-100">
        <div className="min-h-[100vh]">
          <div className="grid place-content-center">
            <div>
              <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
                <h1 className="text-3xl font-sans pt-4 pb-8 font-normal">
                  Formulario Actualización de usuario
                </h1>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-lg font-extralight mb-2"
                    for="username"
                  >
                    Modifique su anterior nombre de usuario
                  </label>
                  <input
                    class="shadow appearance-none text-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    name="username"
                    type="text"
                    value={updatedUser?.username}
                    onChange={habdleInputChange}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-lg font-extralight mb-2"
                    for="username"
                  >
                    Modifique su anterior email
                  </label>
                  <input
                    class="shadow appearance-none text-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="text"
                    value={updatedUser?.email}
                    onChange={habdleInputChange}
                  />
                </div>
                <div class="flex items-end justify-between mt-10">
                  <Link to={"/home"}>
                    <button
                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Volver
                    </button>
                  </Link>
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>

            <div>
              <div className="flex justify-center pt-4 pb-4 mt-20">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleDeleteUser()}
                >
                  Eliminar Usuario
                </Button>
              </div>
            </div>
          </div>

          <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 600"
            xmlns="http://www.w3.org/2000/svg"
            class="transition duration-300 ease-in-out delay-150"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stop-color="#002bdc"></stop>
                <stop offset="95%" stop-color="#32ded4"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,600 C 0,600 0,200 0,200 C 90.32535885167462,205.0334928229665 180.65071770334924,210.06698564593302 262,187 C 343.34928229665076,163.93301435406698 415.72248803827756,112.76555023923447 534,137 C 652.2775119617224,161.23444976076553 816.4593301435406,260.87081339712915 913,267 C 1009.5406698564594,273.12918660287085 1038.44019138756,185.75119617224883 1115,159 C 1191.55980861244,132.24880382775117 1315.77990430622,166.1244019138756 1440,200 C 1440,200 1440,600 1440,600 Z"
              stroke="none"
              stroke-width="0"
              fill="url(#gradient)"
              fill-opacity="0.53"
              class="transition-all duration-300 ease-in-out delay-150 path-0"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stop-color="#002bdc"></stop>
                <stop offset="95%" stop-color="#32ded4"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,600 C 0,600 0,400 0,400 C 80.03827751196172,379.67464114832535 160.07655502392345,359.34928229665076 264,360 C 367.92344497607655,360.65071770334924 495.73205741626793,382.2775119617225 599,390 C 702.2679425837321,397.7224880382775 780.9952153110048,391.5406698564593 877,396 C 973.0047846889952,400.4593301435407 1086.2870813397128,415.5598086124402 1183,418 C 1279.7129186602872,420.4401913875598 1359.8564593301435,410.2200956937799 1440,400 C 1440,400 1440,600 1440,600 Z"
              stroke="none"
              stroke-width="0"
              fill="url(#gradient)"
              fill-opacity="1"
              class="transition-all duration-300 ease-in-out delay-150 path-1"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Actualizar;
