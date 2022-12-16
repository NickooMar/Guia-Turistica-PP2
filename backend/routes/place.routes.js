const express = require("express");
const placesController = require("./place.controller");

const router = express();

router.post("/place", placesController.savePlace);
router.delete("/place", placesController.deletePlace);

module.exports = router;
