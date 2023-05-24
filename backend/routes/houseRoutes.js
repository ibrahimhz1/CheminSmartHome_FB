const express = require('express');

// Router Definition
const router = express.Router();

// House Controller Exports Functions
const { createHouse, getAllHouses, getHouseDetails, deleteHouse } = require('../controller/houseController');
const { isAuthenticatedUser } = require('../middleware/auth');

// Routes
router.route("/house/new").post(isAuthenticatedUser, createHouse);

router.route("/houses").get(getAllHouses);

router.route("/house/:id")
    .get(getHouseDetails)
    .delete(isAuthenticatedUser, deleteHouse);

module.exports = router;