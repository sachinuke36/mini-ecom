"use strict";
// import express, { Request, Response, urlencoded } from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import router from '../routes/router'
// import router2 from '../routes/router2'
// import cookieParser from 'cookie-parser';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import multerStorageCloudinary from 'multer-storage-cloudinary';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const PORT = 8000;
// dotenv.config();
// app.use(cors({origin:'http://localhost:3000', credentials: true}));
// // app.use(express.json());
// app.use(cookieParser());
// app.use(urlencoded({extended: true}));
// cloudinary.config({ url: process.env.CLOUDINARY_URL});
// const storage = multerStorageCloudinary({
//         cloudinary: cloudinary,
//         params: {
//             resource_type: 'image',
//             public_id: 'products',
//             allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
//         } as any,
//     });
// export const upload = multer({ storage: storage });
// app.use('/api2',router2());
// app.use(express.json({ limit: '10mb' }));
// app.get('/',(req,res)=>{
//   res.send('<h1>Hii there!</h1>')
// })
// app.use('/api',router());
// app.listen(PORT,()=>{
//     console.log(`Server is listening to port:${PORT}`)
// })
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../routes/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
const product_controller_1 = require("../controllers/product.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8000;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_1.urlencoded)({ extended: true }));
cloudinary_1.v2.config({ url: process.env.CLOUDINARY_URL });
const storage = (0, multer_storage_cloudinary_1.default)({
    cloudinary: cloudinary_1.v2,
    params: {
        resource_type: 'image',
        public_id: (req, file) => `products/${Date.now()}-${file.originalname}`,
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post('/api2/products/add', upload.single('image'), product_controller_1.addProduct);
app.use(express_1.default.json({ limit: '10mb' }));
app.use('/api', (0, router_1.default)());
app.get('/', (req, res) => {
    res.send('<h1>Hii there!</h1>');
});
app.listen(PORT, () => {
    console.log(`Server is listening to port:${PORT}`);
});
//# sourceMappingURL=index.js.map