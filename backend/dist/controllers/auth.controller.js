"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Login = void 0;
const Login = async (req, res) => {
    const { email, password } = req.body;
    console.log("hii there");
    console.log({ email, password });
    return res.status(201).json({ message: 'User logged in' });
};
exports.Login = Login;
const Register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
};
exports.Register = Register;
//# sourceMappingURL=auth.controller.js.map