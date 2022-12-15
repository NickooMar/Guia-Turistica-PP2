import React, { useContext } from "react";

import AuthContext from "../Context/AuthContext";

import { Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import Header from "../Header/Header";

import Button from "@material-ui/core/Button";

import "@fontsource/roboto/300.css";

import { useNavigate } from "react-router-dom";

import SavedPlaces from "./SavedPlaces";

const Perfil = () => {
  const { user, AuthGetUser } = useContext(AuthContext);

  AuthGetUser();

  console.log(user);

  const navigate = useNavigate();

  return (
    <div style={styles.container}>
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

      <Container className="mt-6 bg-">
        <Paper elevation={3}>
          <Typography variant="h4" className="text-center mt-8">
            Lista de sitios guardados
          </Typography>
          <SavedPlaces />
        </Paper>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "rgb(12 74 110)",
  },
};

export default Perfil;
