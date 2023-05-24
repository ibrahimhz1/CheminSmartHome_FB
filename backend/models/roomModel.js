const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Room Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name cannot be less than 4 characters"],
        trim: true,
    },
    description: {
        type: String,
    },
    house: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Room", roomSchema);