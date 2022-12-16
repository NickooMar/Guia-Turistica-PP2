import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

import { useNavigate } from "react-router-dom";

import {
  handleDeleteSavedPlaceRequest,
  getPrivateDataRequest,
  patchUpdateUserRequest,
  deleteUserRequest,
  savePlaceRequest,
} from "../../api/index";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  //Logout User
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //Get user and places data
  const AuthGetUser = async () => {
    // Backend User Request UseEffect
    useEffect(() => {
      const token = localStorage.getItem("token");

      const fetchPrivateData = async () => {
        try {
          const response = await getPrivateDataRequest(token);
          const userPrivateData = response.data;
          setPlaces(response.data?.places);
          setUser(userPrivateData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPrivateData();
    }, [setUser]);
  };

  // Delete Place saved by user
  const handleDeleteSavedPlace = async (id) => {
    try {
      await handleDeleteSavedPlaceRequest(user?._id, id);
      setPlaces(places.filter((place) => place.placeID !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Update user data
  const handleUpdateUser = async (id, username, email) => {
    try {
      await patchUpdateUserRequest(id, username, email);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await deleteUserRequest(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Save place by user
  const savePlaceByUser = async (
    userID,
    placeID,
    name,
    rating,
    price,
    ranking,
    image,
    phone
  ) => {
    try {
      const savePlaceResponse = await savePlaceRequest(
        userID,
        placeID,
        name,
        rating,
        price,
        ranking,
        image,
        phone
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        AuthGetUser,
        user,
        places,
        logoutHandler,
        handleDeleteSavedPlace,
        handleUpdateUser,
        deleteUser,
        savePlaceByUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
