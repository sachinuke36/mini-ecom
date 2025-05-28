"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const isLoggedIn = (req, res, next) => {
    const token = req.cookies.authtoken;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        // const authToken = getCookieValue('authtoken');
        // console.log('Auth Token:', authToken);
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }
};
exports.isLoggedIn = isLoggedIn;
function getCookieValue(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}
//# sourceMappingURL=isLoggedIn.js.map