import React from "react";

import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating"; // It's on beta

import useStyles from "./styles";
import { mapStyles } from './mapStyles';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)} //Usado cuando presionas un marcador para que se seleccione
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isMobile ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom >{place.name}</Typography>
                <img className={classes.pointer} 
                  src={ place.photo ? place.photo.images.large.url : "https://media-cdn.tripadvisor.com/media/photo-s/17/75/d7/11/rush-bar.jpg" } 
                  alt={place.name}
                  />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

          {weatherData?.list?.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img height='100' src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weatherIcon" />
            </div>
          ))}


      </GoogleMapReact>
    </div>
  );
};

export default Map;
