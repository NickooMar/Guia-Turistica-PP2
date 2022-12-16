import { Button } from "@material-ui/core";
import React, { useContext } from "react";

import AuthContext from "../Context/AuthContext";

const SavedPlaces = () => {
  const { places, handleDeleteSavedPlace } = useContext(AuthContext);


  return (
    <div className="flex justify-around md:flex-wrap sm:flex-wrap ">
      {places?.map((savedPlace) => (
        <div class="max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
          <div>
            <img
              class="rounded-t-lg"
              src={savedPlace?.image}
              alt="savedplace image"
            />
            <div class="p-5">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {savedPlace.name}
              </h5>
              <p class="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                {savedPlace.rating}
              </p>
              <p class="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                {savedPlace.price}
              </p>
              <p class="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                {savedPlace.ranking}
              </p>
              <p class="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                {savedPlace.phone}
              </p>
              <p class="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                <span className="text-white">Guardado el día: </span>{" "}
                {savedPlace.savedAt.slice(0, 9)}
              </p>

              <div className="flex justify-between mt-12">
                <Button variant="contained" color="primary">
                  Website
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteSavedPlace(savedPlace?.placeID)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPlaces;
