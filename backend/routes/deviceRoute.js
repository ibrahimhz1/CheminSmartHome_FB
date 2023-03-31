const express = require('express');

// Router Definition
const router = express.Router();


// Device Controller Exports Functions
const { createDevice, getAllDevices, getDeviceDetails, deleteDevice } = require('../controller/deviceController');
const { isAuthenticatedUser } = require('../middleware/auth');

// Routes
router.route("/device/new").post(isAuthenticatedUser, createDevice);

router.route("/devices").get(getAllDevices);

router.route("/device/:id")
    .get(getDeviceDetails)
    .delete(isAuthenticatedUser, deleteDevice);

module.exports = router;