
# 🛒 Mini E-Commerce App

A full-stack **Mini E-Commerce Web Application** built with **Next.js**, **Express**, **PostgreSQL**, **Prisma**, and **Cloudinary** for uploading product images. The app allows users to **add products** and **view/search their products** in a clean, responsive interface powered by **Tailwind CSS**.

---

## 🚀 Features

### 🔹 Tab 1: Product Submission

- Add new products with:
  - Name
  - Price
  - Description
  - Image upload (via Cloudinary)
- Data is sent to the backend and stored in a PostgreSQL database via Prisma ORM.

### 🔹 Tab 2: My Products

- View a dynamic list of your submitted products.
- Each product is displayed in a **card layout**:
  - Name
  - Price
  - Description
  - Uploaded image
- Products are fetched from the backend and update instantly on submission.

### 🔍 Optional: Search Feature

- **Simple Search**: Search products by name or keywords in description.
- OR **Contextual Search** *(Future Scope)*: Smarter matching based on semantic meaning, not just text match.

---

## ⚙️ Tech Stack

### Frontend
- **Next.js** (React Framework)
- **Tailwind CSS** (for styling)
- **React Icons** (UI icons)

### Backend
- **Express.js** (Node.js framework)
- **Prisma** (ORM)
- **PostgreSQL** (via Neon.tech hosting)
- **Cloudinary** (Image uploads)
- **JWT Authentication**
- **Multer** (Image handling middleware)
- **OpenAI API** *(optional)*

---



## 🧪 .env Configuration (Server)

```env
DATABASE_URL="postgresql://<user>:<password>@<host>/<dbname>?sslmode=require"
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
OPENAI_API_KEY=your_openai_api_key
```

---

## 🛠️ Run the Project

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints (Backend)

| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api2/products/add` | Add new product |
| GET    | `/api/products/:userId` | Fetch user’s products |
| GET    | `/api/auth/me` | Authenticate current user |

---

## ✨ Highlights

- 🔐 Authenticated product management per user
- ☁️ Cloudinary for optimized image hosting
- 🔄 Live UI updates after submission
- 📱 Responsive design with Tailwind CSS
- 💬 Search feature for quick product discovery

---

## 🧠 Future Improvements

- Add **contextual AI-based search**
- Edit/delete product functionality
- Image optimization & compression

---

## 🙌 Author

Developed by **Sachin Krupal uke**
