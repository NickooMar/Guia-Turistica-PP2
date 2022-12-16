const User = require("../models/User");

const asyncHandler = require("express-async-handler");

const savePlace = asyncHandler(async (req, res) => {
  const { userID, placeID, name, rating, price, ranking, image, phone } =
    req.body;

  const duplicate = await User.findOne(
    { _id: userID },
    {
      places: { $elemMatch: { placeID: placeID } },
    }
  );

  if (duplicate?.places?.length > 0) {
    const errorResponse = "El lugar ya ha sido guardado anteriormente";
    return res.status(409).json(errorResponse);
  } else if (duplicate.places.length === 0) {
    await User.findByIdAndUpdate(
      { _id: userID },
      {
        $push: {
          places: { placeID, name, rating, price, ranking, image, phone },
        },
      }
    );

    return res.status(200).json({ message: "Guardado" });
  } else {
    return res.status(400).json({ error: "Error" });
  }
});

const deletePlace = asyncHandler(async (req, res) => {
  const { userID, id } = req.body;

  if (!userID || !id) {
    return res.status(400).json({ message: "Datos invalidos" });
  }

  try {
    await User.findByIdAndUpdate(
      { _id: userID },
      {
        $pull: {
          places: { placeID: id },
        },
      }
    );
    return res.status(200).json({ message: "Eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
});

module.exports = { savePlace, deletePlace };
