import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
          await axios
            .get(`http://localhost:4000/user?auth-token=${token}`, {
              withCredentials: true,
            })
            .then((res) => {
              const userPrivateData = res.data;
              setPlaces(res.data?.places);
              setUser(userPrivateData);
            });
        } catch (error) {
          console.log(error);
        }
      };

      fetchPrivateData();
    }, [setUser]);
  };

  // Delete Place saved by user
  const handleDeleteSavedPlace = async (id) => {
    const userID = user?._id;

    try {
      axios
        .delete("http://localhost:4000/place", {
          data: { userID, id },
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success("Lugar eliminado correctamente");

            setPlaces(places.filter((place) => place.placeID != id));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        AuthGetUser,
        user,
        logoutHandler,
        handleDeleteSavedPlace,
        places,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
