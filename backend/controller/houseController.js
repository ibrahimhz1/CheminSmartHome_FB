// ErrorHandler Utility Import
const ErrorHandler = require('../utils/errorhandler');

// CatchAsyncErrors MiddleWare Import
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Device Model Import
const House = require('../models/houseModel');

// CREATE DEVICE
exports.createHouse = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    const house = await House.create(req.body);

    res.status(201).json({
        success: true,
        house,
    });
});

// GET ALL DEVICES
exports.getAllHouses = catchAsyncErrors(async(req, res, next) => {
    const houses = await House.find();

    res.status(200).json({
        success: true,
        houses,
    });
});

// GET SINGLE DEVICE DETAILS
exports.getHouseDetails = catchAsyncErrors(async(req, res, next) => {
    const house = await House.findById(req.params.id);

    // Using Error Middleware
    if(!house){
        return next(new ErrorHandler("House not found ", 404));
    }

    res.status(201).json({
        success: true,
        house,
    });
});

// DELETE PRODUCT
exports.deleteHouse = catchAsyncErrors(async(req, res, next) => {
    const house = await House.findById(req.params.id);
    
    if(!house){
        return next(new ErrorHandler("House not found so cannot be deleted", 404));
    }

    await house.deleteOne();

    res.status(200).json({
        success: true,
        message: "House Delted Successfully"
    });

});

