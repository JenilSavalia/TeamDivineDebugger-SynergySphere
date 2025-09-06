import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();
const prisma = new PrismaClient();

const maxAge = 5 * 60 * 60; // 1 hour


export const sendSignupOTP = async (req, res) => {
    try {
        const { email, username, password, rePassword, role } = req.body;

        if (!email || !password || !username || !rePassword || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== rePassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!["PROJECT_MANAGER", "PROJECT_MEMBER"].includes(role)) {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        await prisma.oTP.upsert({
            where: { email },
            update: { otp: otpCode, expiresAt, role },
            create: { email, otp: otpCode, expiresAt, role },
        });

        await sendEmail(
            email,
            "Welcome to SynergySphere 🚀",
            `Your Signup OTP is ${otpCode}. It expires in 2 minutes.`
        );

        res.json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const verifySignupOTP = async (req, res) => {
    try {
        const { email, username, otp, password } = req.body;

        if (!otp) return res.status(400).json({ message: "OTP is required" });

        const record = await prisma.oTP.findUnique({ where: { email } });
        if (!record) return res.status(400).json({ message: "OTP not found" });

        if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (record.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: record.role,
                isVerified: true,
            },
        });

        await prisma.oTP.delete({ where: { email } });

        res.json({ message: "Signup successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const sendLoginOTP = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("body :", req.body)

        if (!email || !password)
            return res.status(400).json({ message: "Email and Password are required" });

        console.log("Email:", email);
        console.log("Password:", password);

        const user = await prisma.user.findUnique({ where: { email } });
        console.log("User found:", user);

        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 60 * 1000);

        await prisma.oTP.upsert({
            where: { email },
            update: { otp: otpCode, expiresAt },
            create: { email, otp: otpCode, expiresAt, role: user.role },
        });

        await sendEmail(
            email,
            "Your Login OTP Code for ShieldRoom Account Login",
            `Your OTP is ${otpCode}. Valid for 1 minute.`
        );

        res.json({ message: "OTP sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const verifyLogin = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Email and Password are required" });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const record = await prisma.oTP.findUnique({ where: { email } });
        if (!record) return res.status(400).json({ message: "OTP not found" });

        if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (record.expiresAt < new Date())
            return res.status(400).json({ message: "OTP expired" });

        await prisma.oTP.delete({ where: { email } });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.json({
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const reSendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 60 * 1000);

        await prisma.oTP.upsert({
            where: { email },
            update: { otp: otpCode, expiresAt },
            create: { email, otp: otpCode, expiresAt },
        });

        await sendEmail(
            email,
            "Your OTP Code for ShieldRoom",
            `Your OTP is ${otpCode}. It expires in 1 minute.`
        );

        res.json({ message: "OTP resent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const resetLink = `http://localhost:5173/auth/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request - ShieldRoom account",
            html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
        });

        res.json({ message: `Password reset link sent to ${user.email}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword, reNewPassword } = req.body;

        if (!newPassword || !reNewPassword) {
            return res.status(400).json({ message: "New Password and Re-Password are required" });
        }

        if (newPassword !== reNewPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: decoded.id },
            data: { password: hashedPassword },
        });

        res.json({ message: "Password reset successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 1,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.json({ message: "Logout successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
