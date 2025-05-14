// import express, { Request, Response, urlencoded } from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import router from '../routes/router'
// import router2 from '../routes/router2'
// import cookieParser from 'cookie-parser';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import multerStorageCloudinary from 'multer-storage-cloudinary';



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





import express, { Request, Response, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from '../routes/router'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import multerStorageCloudinary from 'multer-storage-cloudinary'
import { addProduct } from '../controllers/product.controller'

dotenv.config()

const app = express()
const PORT = 8000

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(urlencoded({ extended: true }))

cloudinary.config({ url: process.env.CLOUDINARY_URL })

const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  params: {
    resource_type: 'image',
    public_id: (req: Request, file: any) => `products/${Date.now()}-${file.originalname}`,
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  } as any,
})
const upload = multer({ storage: storage })

app.post('/api2/products/add', upload.single('image'), addProduct)

app.use(express.json({ limit: '10mb' }))

app.use('/api', router())

app.get('/', (req, res) => {
  res.send('<h1>Hii there!</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is listening to port:${PORT}`)
})
