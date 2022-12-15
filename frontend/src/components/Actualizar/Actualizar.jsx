import React, { useContext, useState } from "react";

import { CssBaseline, Button } from "@material-ui/core";
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

      <div class="grid place-content-center">
        <h1 className="text-2xl my-10 font-bold">
          Formulario Actualización de usuario
        </h1>
        <div className="w-96">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Modifique su anterior nombre de usuario
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                value={updatedUser?.username}
                onChange={habdleInputChange}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Modifique su anterior email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    </>
  );
};

export default Actualizar;
