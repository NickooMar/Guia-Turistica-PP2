import React, { useContext } from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import axios from "axios";
import AuthContext from "../Context/AuthContext";

import useStyles from "./styles";

import { toast } from "react-toastify";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  if (selected)
    refProp?.current?.scrollIntoView({ behaviour: "smooth", block: "start" });

  const handleSavePlace = (
    placeID,
    name,
    rating,
    price,
    ranking,
    image,
    phone
  ) => {
    const userID = user._id;

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      axios
        .post(
          "http://localhost:4000/place",
          {
            userID,
            placeID,
            name,
            rating,
            price,
            ranking,
            image,
            phone,
          },
          { withCredentials: true },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            toast.success("Sitio guardado Satisfactoriamente");
          }
        })
        .catch((error) => {
          toast.error(
            "Sitio anteriormente guardado, por favor, seleccione otro"
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://media-cdn.tripadvisor.com/media/photo-s/17/75/d7/11/rush-bar.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            Out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, i) => (
          <Box
            key={i}
            my={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle1">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        <CardActions className="flex justify-between">
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>

          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              handleSavePlace(
                place?.location_id,
                place?.name,
                place?.rating,
                place?.price_level,
                place?.ranking,
                place?.photo.images.large.url,
                place?.phone
              );
            }}
          >
            Guardar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
