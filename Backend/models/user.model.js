import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        }, // Hashed for signup only
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
