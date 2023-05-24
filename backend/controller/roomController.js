// ErrorHandler Utility Import
const ErrorHandler = require('../utils/errorhandler');

// CatchAsyncErrors MiddleWare Import
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Device Model Import
const Room = require('../models/roomModel');

// CREATE DEVICE
exports.createRoom = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    const room = await Room.create(req.body);

    res.status(201).json({
        success: true,
        room,
    });
});

// GET ALL DEVICES
exports.getAllRooms = catchAsyncErrors(async(req, res, next) => {
    const rooms = await Room.find();

    res.status(200).json({
        success: true,
        room,
    });
});

// GET SINGLE DEVICE DETAILS
exports.getRoomDetails = catchAsyncErrors(async(req, res, next) => {
    const room = await Room.findById(req.params.id);

    // Using Error Middleware
    if(!room){
        return next(new ErrorHandler("Room not found ", 404));
    }

    res.status(201).json({
        success: true,
        room,
    });
});

// DELETE PRODUCT
exports.deleteRoom = catchAsyncErrors(async(req, res, next) => {
    const room = await Room.findById(req.params.id);
    
    if(!room){
        return next(new ErrorHandler("Room not found so cannot be deleted", 404));
    }

    await room.deleteOne();

    res.status(200).json({
        success: true,
        message: "Room Delted Successfully"
    });

});

