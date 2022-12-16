import React, { useContext } from "react";

import AuthContext from "../Context/AuthContext";

import { Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import Header from "../Header/Header";

import Button from "@material-ui/core/Button";

import "@fontsource/roboto/300.css";

import { useNavigate } from "react-router-dom";

import SavedPlaces from "./SavedPlaces";

const Perfil = () => {
  const { user, AuthGetUser, places } = useContext(AuthContext);

  AuthGetUser();

  const navigate = useNavigate();

  return (
    <div className="bg-blue-200 min-h-screen">
      <CssBaseline />
      <Header />

      <Container fixed className="mt-6">
        <Paper elevation={3}>
          <div className="flex justify-center items-center space-x-36 pt-4 pb-4">
            <div>
              <img
                className="h-20 rounded-lg w-full object-cover md:h-full md:w-48 "
                src="https://images.unsplash.com/photo-1574864745093-5566c5be5855?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Modern building architecture"
              />
            </div>
            <div>
              <Typography className="text-center" variant="h2">
                Hola {user?.username}!
              </Typography>
            </div>
          </div>
          {places.length > 0 ? (
            <div className="my-12">
              <Typography variant="h4" className="text-center">
                Lista de sitios guardados
              </Typography>

              <SavedPlaces />
            </div>
          ) : (
            <div className="my-8">
              <Typography variant="h5" className="text-center text-gray-500">
                No hay sitios guardados
              </Typography>
            </div>
          )}
          <div className="flex justify-center pt-4 pb-4">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate("/home");
              }}
            >
              Volver
            </Button>
          </div>
        </Paper>
      </Container>

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
  );
};

export default Perfil;
