const express = require('express');

// Router Definition
const router = express.Router();

// House Controller Exports Functions
const { createRoom, getAllRooms, getRoomDetails, deleteRoom } = require('../controller/roomController');
const { isAuthenticatedUser } = require('../middleware/auth');

// Routes
router.route("/room/new").post(isAuthenticatedUser, createRoom);

router.route("/rooms").get(getAllRooms);

router.route("/room/:id")
    .get(getRoomDetails)
    .delete(isAuthenticatedUser, deleteRoom);

module.exports = router;