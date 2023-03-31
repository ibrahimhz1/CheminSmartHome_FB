// ErrorHandler Utility Import
const ErrorHandler = require('../utils/errorhandler');

// CatchAsyncErrors MiddleWare Import
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Device Model Import
const Device = require('../models/deviceModel');

// CREATE DEVICE
exports.createDevice = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    const device = await Device.create(req.body);

    res.status(201).json({
        success: true,
        device,
    });
});

// GET ALL DEVICES
exports.getAllDevices = catchAsyncErrors(async(req, res, next) => {
    const devices = await Device.find();

    res.status(200).json({
        success: true,
        devices,
    });
});

// GET SINGLE DEVICE DETAILS
exports.getDeviceDetails = catchAsyncErrors(async(req, res, next) => {
    const device = await Device.findById(req.params.id);

    // Using Error Middleware
    if(!device){
        return next(new ErrorHandler("Device not found ", 404));
    }

    res.status(201).json({
        success: true,
        device,
    });
});

// DELETE PRODUCT
exports.deleteDevice = catchAsyncErrors(async(req, res, next) => {
    const device = await Device.findById(req.params.id);
    
    if(!device){
        return next(new ErrorHandler("Device not found so cannot be deleted", 404));
    }

    await device.deleteOne();

    res.status(200).json({
        success: true,
        message: "Device Delted Successfully"
    });

});

