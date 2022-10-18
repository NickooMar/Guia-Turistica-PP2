import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

//Backend Request
import axios from "axios";

import { getPlacesData, getWeatherData } from "../api";
import Header from "./Header/Header";
import List from "./List/List";
import Map from "./Map/Map";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [privateData, setPrivateData] = useState(null);

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [weatherData, setWeatherData] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  //Backend User Request UseEffect
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    const fetchPrivateData = async () => {
      try {
        axios
          .get(`http://localhost:4000/user?auth-token=${token}`, {
            withCredentials: true,
          })
          .then((res) => {
            const userPrivateData = res.data;
            setPrivateData(userPrivateData);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrivateData();
  }, []);

  //Logout User
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    //Rating useEffect
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]); //Every time the data is updated, the filteredPlaces are reset to an empty array
        setIsLoading(false);
      });
    }
  }, [type, bounds, coordinates.lat, coordinates.lng]);

  return (
    <>
      <CssBaseline />
      <Header
        setCoordinates={setCoordinates}
        privateData={privateData}
        logoutHandler={logoutHandler}
      />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          {/*This xs take full width on mobile devices, in medium or larger devices take 4 spaces.*/}
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={filteredPlaces?.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
