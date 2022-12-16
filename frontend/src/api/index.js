import axios from "axios";
import { toast } from "react-toastify";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        //Places
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      `https://community-open-weather-map.p.rapidapi.com/find`,
      {
        params: { lon: lng, lat: lat },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      }
    );

    return data;
  } catch (error) {}
};

// Crear nuevo usuario
export const createUserRequest = async (
  email,
  username,
  password,
  confirmPassword
) => {
  try {
    const createUserResponse = await axios.post(
      "http://localhost:4000/register",
      {
        email,
        username,
        password,
        confirmPassword,
      },
      {
        withCredentials: true,
      }
    );
    return createUserResponse;
  } catch (error) {
    console.log(error);
  }
};

// Login del usuario
export const loginUser = async (email, password) => {
  try {
    const loginUserResponse = await axios.post(
      "http://localhost:4000/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return loginUserResponse;
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteSavedPlaceRequest = async (userID, id) => {
  await axios.delete("http://localhost:4000/place", { data: { userID, id } });
};

export const getPrivateDataRequest = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/user?auth-token=${token}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    toast.error("Error al obtener información del usuario");
  }
};

export const patchUpdateUserRequest = async (id, username, email) => {
  try {
    const updateUserResponse = await axios.patch(
      "http://localhost:4000/user",
      { id, username, email },
      { withCredentials: true }
    );

    return updateUserResponse;
  } catch (error) {
    toast.error("Error al actualizar el usuario");
  }
};

export const deleteUserRequest = async (id) => {
  try {
    const deleteUserResponse = await axios.delete(
      "http://localhost:4000/user",
      {
        data: { id },
      },
      {
        withCredentials: true,
      }
    );
    return deleteUserResponse;
  } catch (error) {
    toast.error("Error al eliminar el usuario");
  }
};

export const savePlaceRequest = async (
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
    await axios
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
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Sitio Guardado Correctamente");
        }
      });
  } catch (error) {
    toast.error("Sitio anteriormente guardado, por favor, seleccione otro");
  }
};
