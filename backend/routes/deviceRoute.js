const express = require('express');

// Router Definition
const router = express.Router();


// Device Controller Exports Functions
const {createDevice, getAllDevices, getDeviceDetails, deleteDevice} = require('../controller/deviceController');
const { isAuthenticatedUser } = require('../middleware/auth');

// Routes
router.route("/device/new").post(createDevice);

router.route("/devices").get(getAllDevices);

router.route("/device/:id").get(getDeviceDetails);

router.route("/device/:id").delete(isAuthenticatedUser, deleteDevice);

module.exports = router;