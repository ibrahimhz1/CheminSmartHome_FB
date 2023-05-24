const mongoose = require('mongoose');

const deviceModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Device Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name cannot be less than 4 characters"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please Enter Device Category"],
    },
    status: {
        type: Number,
        default: 0,                                     // 0 -> Off , 1 -> On // For Smart Lights and Bulbs and Doors
        required: [true, "Status Field cannot be Empty"],
    },
    speed: {
        type: Number,
        default: 1,                                     // 1 -> Slow , 2-> Normal, 3-> Fast // For Smart Fans
    },
    temperature: {
        type: Number,
        enum: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],  // Temperature Range // For Smart AC
    },
    house: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("deviceModel", deviceModel);