"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
exports.default = (router) => {
    router.get('/products/:userId', product_controller_1.getProducts);
};
//# sourceMappingURL=product.route.js.map