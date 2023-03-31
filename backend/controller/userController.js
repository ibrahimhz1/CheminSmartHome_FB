// ErrorHandler Utility Import
const ErrorHandler = require('../utils/errorhandler');

// CatchAsyncErrors MiddleWare Import
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// User Model Import
const User = require('../models/userModel');

// Its a separate module which creates jwtToken and stores in a cookie
const sendToken = require('../utils/jwtToken');

// send Email function import
const sendEmail = require('../utils/sendEmail');

// Crypto Import
const crypto = require('crypto');

// Cloudinary Import
const cloudinary = require('cloudinary')

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    
    // Cloudinary configuration will be added later

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        // cloudinary parameters
    });

    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success: true,
    //     token
    // })

    // Creating jwttoken and saving in cookie 
    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking email & password is given or not
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email and Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email and Password", 401));
    }

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // })

    sendToken(user, 200, res);
})

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logout Successfully",
    })
});

// Forget Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: "NerdCentra Ecommerce Password Recovery",
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or have been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });

});

// Update / Change User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // we will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile Updated successfully"
    })
});

// Get All Users -- Admin
exports.getAllUsers = catchAsyncErrors( async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
} )

// Get Any Single Users -- Admin
exports.getSingleUser = catchAsyncErrors( async(req, res, next)=> {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with ID ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
} )

// Update User Roles, Email, Names -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    // we will add cloudinary later
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        message: "User Role Updated successfully"
    })
});

// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }

    // we will delete cloudinary later
    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
});

exports.putdetail = catchAsyncErrors(async(req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Welcome"    
    })
})