<!-- HEADER BANNER -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&text=MERN%20Clothing%20Ecommerce%20Project&fontSize=40&fontColor=ffffff&animation=fadeIn" />
</p>

<!-- BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black?style=for-the-badge" />
</p>

---

## 📌 Project Overview
A full-stack **clothing eCommerce web application** built with MERN stack featuring authentication, real-time updates, product management, and a modern responsive UI.

---

## 🛠️ Tech Stack

### Frontend
- HTML5  
- CSS3  
- JavaScript (ES6)  
- React.js  
- Redux  
- Material UI (MUI)  
- React Router DOM  
- Axios  

---

### Backend
- Node.js  
- Express.js  
- Mongoose  

---

### Database
- MongoDB (Aggregation Pipelines)  

---

### Other Tools
- Nodemailer (Email Services)  
- EJS (Email Templates)  
- Multer (File Uploads)  
- Cloudinary (Cloud Storage)  
- Socket.IO (Real-time Communication)  

---

## 🚀 Features

- 🔐 Authentication (JWT + Email Verification)
- 🛍️ Product listing with search, filter & pagination
- 🛒 Cart & checkout system
- 📦 Order tracking system
- ⚡ Real-time notifications (Socket.IO)
- 🧑‍💼 Admin dashboard with analytics
- 📱 Fully responsive UI

---

## 🚀 Installation Guide

### 📁 Frontend Setup
```bash
cd frontend
cd vite-project
npm install
npm run dev
```
👉 Runs at: http://localhost:5173

### 📁 Backend Setup 

#### 🔐 Environment Variables
Create .env in backend:

```bash
# Server Port
PORT=4000

# MongoDB Connection String (from MongoDB Atlas)
MONGODB_URI=your_mongo_url

# JWT Secret Key (any strong random string)
JWT_SECRET_KEY=your_secret

# Cloudinary (for image upload)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Gmail SMTP or app password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```


```bash
cd backend
npm install
npm run dev
```
👉 Runs at: http://localhost:4000 or your given port.



# 📸 Screenshots

## 🏠 Home Page
![Home Page](./Home.png)

## 👗 Product Listing
### Men
![Product Listing](./Men.png)
### Women
![Product Listing](./Women.png)
### Kids
![Product Listing](./Kids.png)

## 🔍 Search & Filtering
![Search Filter](./screenshots/search-filter.png)

## 📊 Sorting & Pagination
![Sorting Pagination](./screenshots/sorting-pagination.png)

## 📄 Product Details Page
![Product Details](./screenshots/product-details.png)

## 🛒 Cart Page
![Cart](./screenshots/cart.png)

## 💳 Checkout Page
![Checkout](./screenshots/checkout.png)

## 📦 Order Tracking
![Order Tracking](./screenshots/order-tracking.png)

## 🔐 Authentication (Login / Register)
![Auth](./screenshots/SignUp.png)
![Auth](./screenshots/Otp_Verification.png)
![Auth](./screenshots/Login.png)
![Auth](./screenshots/Forget_Password.png)
![Auth](./screenshots/Reset_Password.png)
## 🧑‍💼 Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboar.png)

## 📦 Product Management
![Product Table](./Products.png)

## 📑 Order Management
![Order Table](./Orders.png)

## 📈 Analytics Dashboard
![Analytics](./Analytics.png)




## 📈 Highlights

- Scalable MERN architecture  
- Clean API structure with separation of concerns  
- Real-world eCommerce logic implementation  
- Optimized queries using MongoDB aggregation  
- Fully responsive and modern UI  




