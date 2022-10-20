import React, { useContext } from "react";

import AuthContext from "../Context/AuthContext";

import "./Perfil.css";
import { CssBaseline } from "@material-ui/core";
import Header from "../Header/Header";

const Perfil = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <CssBaseline />
      <Header />
      <div class="text-center">
        <div class="page-content page-container" id="page-content">
          <div class="padding">
            <div class="row d-flex justify-content-center">
              <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-4 bg-c-lite-green user-profile">
                      <div class="card-block text-center text-white">
                        <div class="m-b-25">
                          <img
                            src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NlbmVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h4 class="f-w-600"></h4>
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          {user?.username}
                        </h6>
                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Información Personal
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">DNI Cliente</p>
                            <h6 class="text-danger f-w-400"></h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Localidad</p>
                            <h6 class="text-danger f-w-400"></h6>
                          </div>
                        </div>
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Información Contacto
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Email</p>
                            <h6 class="text-danger f-w-400"></h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Telefono</p>
                            <h6 class="text-danger f-w-400"></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
