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
A clean and modern landing page showcasing featured collections, trending products, and promotional banners. Designed for a smooth user experience with responsive layout across all devices.
![Home Page](./Home.png)

---

## 👗 Product Listing

### 👔 Men
Explore a wide range of men's clothing with advanced server-side features including sorting, searching, and pagination for optimal performance and scalability.
![Product Listing](./Men.png)

### 👗 Women
Browse women's fashion collections with efficient server-side filtering, sorting, and pagination to ensure fast and seamless navigation.
![Product Listing](./Women.png)

### 🧒 Kids
Discover kids' apparel with intuitive UI and server-side handling for search, sorting, and pagination, delivering a smooth browsing experience.
![Product Listing](./Kids.png)

---

## 🔍 Advanced Filtering
Users can refine product searches using multiple filters such as price range, color, and size. All filtering operations are handled server-side for better performance and scalability.
![Search Filter](./Porduct_Filtering.png)

---

## 📄 Product Details Page
Detailed product view including images, descriptions, pricing, available sizes, and related products to enhance purchasing decisions.
![Product Details](./Men_Product_Detail.png)
![Product Details](./Women_Product_Detail.png)
![Product Details](./Kids_Product_Detail.png)

---

## 🛒 Cart Page
A dynamic cart system where users can review selected items, update quantities, and view total pricing before proceeding to checkout.
![Cart](./Cart.png)

---

## 💳 Checkout Page
Secure and user-friendly checkout experience with order summary, shipping details, and payment processing.
![Checkout](./Checkout.png)

---

## 📦 Order Tracking
Real-time order tracking powered by Socket.IO, allowing users to monitor order status updates instantly.
![Order Tracking](./Order_Tracking.png)

---

## 🔐 Authentication System

### 📝 Sign Up
New users can easily register with secure validation and account creation flow.
![Auth](./SignUp.png)

### 🔢 OTP Verification
A 4-digit OTP is sent to the user's email for verification, ensuring secure account activation.
![Auth](./Otp_Verfication.png)

### 🔑 Login
Existing users can log in securely to access their account and manage orders.
![Auth](./Login.png)

### 🔁 Forgot Password
Users can request a password reset link via email to recover their account.
![Auth](./Forget_Password.png)

### 🔒 Reset Password
Secure password reset interface allowing users to set a new password.
![Auth](./Reset_Password.png)

---

## 🧑‍💼 Admin Dashboard
A powerful admin panel to manage the entire platform including users, products, and orders with an intuitive interface.
![Admin Dashboard](./screenshots/admin-dashboar.png)

---

## 📦 Product Management
Admins can create, update, delete, and manage products efficiently with advanced features like search, sorting, filtering, and pagination.
![Product Table](./Products.png)

---

## 📑 Order Management
Admins can track, update order statuses, and manage orders with full control including search, sorting, filtering, and pagination.
![Order Table](./Orders.png)

---

## 📈 Analytics Dashboard
Comprehensive analytics providing insights into sales, users, and product performance to support data-driven decisions.
![Analytics](./Analytics.png)


## 📈 Highlights

- Scalable MERN architecture  
- Clean API structure with separation of concerns  
- Real-world eCommerce logic implementation  
- Optimized queries using MongoDB aggregation  
- Fully responsive and modern UI  




