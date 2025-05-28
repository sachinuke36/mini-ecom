"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Logout = exports.Login = void 0;
exports.getUser = getUser;
exports.generateSalt = generateSalt;
exports.setCookies = setCookies;
const bcryptjs_1 = require("bcryptjs");
const bcryptjs_2 = __importDefault(require("bcryptjs"));
const db_config_1 = require("../db/db.config");
// import { User } from "generated/prisma";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new Error('Email and password are required');
    try {
        const user = await db_config_1.prisma.user.findFirst({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found!" });
        const isMatch = await bcryptjs_2.default.compare(password, user?.password);
        if (isMatch) {
            return setCookies(user, res);
        }
        // return res.status(201).json({message:'User logged in successfully!'});
    }
    catch (error) {
        console.log("Error in login");
        console.log(error);
    }
};
exports.Login = Login;
const Logout = (req, res) => {
    res.clearCookie('authtoken');
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.Logout = Logout;
const Register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name)
        throw new Error('All fields are required');
    const user = await db_config_1.prisma.user.findFirst({ where: { email } });
    if (user)
        return res.json({ message: 'User already exist! Please login.' });
    const hashedPass = await generateSalt(password);
    try {
        const response = await db_config_1.prisma.user.create({
            data: {
                email,
                password: hashedPass,
                name
            }
        });
        console.log(response);
        const newUser = await db_config_1.prisma.user.findFirst({ where: { email } });
        if (newUser) {
            return setCookies(newUser, res);
        }
    }
    catch (error) {
        console.log("Error in register");
        console.log(error);
    }
    // res.status(201).json({ message: 'User registered successfully' });
};
exports.Register = Register;
async function getUser(req, res) {
    const { userId } = req.params.userId;
    try {
        const user = await db_config_1.prisma.user.findFirst({ where: { userId }, select: {
                userId: true,
                name: true,
                email: true,
            } });
        if (!user)
            return res.json({ message: "No user found!" });
        return res.status(201).json({ user: user });
    }
    catch (error) {
        console.log(error);
    }
}
async function generateSalt(password) {
    const salt = await (0, bcryptjs_1.genSalt)(10);
    const hashedPass = await bcryptjs_2.default.hash(password, salt);
    return hashedPass;
}
async function setCookies(user, res) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = await jsonwebtoken_1.default.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).cookie('authtoken', token).json({ success: true, userId: user.userId });
}
//# sourceMappingURL=auth.controller.js.map