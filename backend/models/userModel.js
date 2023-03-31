const validator = require('validator');
const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name cannot be less than 4 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valide email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "Password cannot be less than 8 characters"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,
});

// Schema Pre function before saving of document
userSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next();    
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
}

// Generating passwords Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hasing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);