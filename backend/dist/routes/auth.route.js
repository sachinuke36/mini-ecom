"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
exports.default = (router) => {
    router.post("/auth/login", auth_controller_1.Login);
    router.get("/auth/logout", auth_controller_1.Logout);
    router.post("/auth/register", auth_controller_1.Register);
    router.get("/user/:userId", auth_controller_1.getUser);
    router.get("/auth/me", isLoggedIn_1.isLoggedIn, (req, res) => {
        res.status(200).json({ user: req.user });
    });
};
//# sourceMappingURL=auth.route.js.map