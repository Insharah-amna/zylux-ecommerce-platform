# Zylux — Beyond the Ordinary 🛒

A full-stack e-commerce platform where users can browse products, make secure payments, and chat with support in real-time. Admins manage orders, products, and inventory through a dedicated dashboard.

## 🌐 Live Demo

**[https://zylux-pink.vercel.app](https://zylux-pink.vercel.app)**

## 🔐 Demo Credentials

| Role  | Email                      | Password |
| :---- | :------------------------- | :------- |
| Admin | insharahamna7@gmail.com    | AAAAAAAA |
| User  | insharahshakir26@gmail.com | AAAAAAAA |

> ⚠️ Please do not change the demo credentials.

## ✨ Features

- **User Authentication** — Secure login & registration with JWT
- **Product Browsing** — Search, filter, and explore products
- **Shopping Cart & Wishlist** — Save and manage items
- **Secure Payments** — Stripe integration with test mode support
- **Real-time Chat** — Live support chat powered by Socket.io
- **Admin Dashboard** — Manage products, orders, categories & reviews
- **Notifications** — Real-time product notifications
- **Responsive Design** — Fully optimized for mobile & desktop

## 🛠️ Tech Stack

| Layer     | Technology                                     |
| :-------- | :--------------------------------------------- |
| Frontend  | Next.js 16, React, Redux Toolkit, Tailwind CSS |
| Backend   | Node.js, Express.js                            |
| Database  | MongoDB, Mongoose                              |
| Real-time | Socket.io                                      |
| Payments  | Stripe                                         |
| Auth      | JWT                                            |
| Images    | Cloudinary                                     |

## 🚀 Deployments

| Layer    | Service       | URL                                                    |
| :------- | :------------ | :----------------------------------------------------- |
| Frontend | Vercel        | [zylux-pink.vercel.app](https://zylux-pink.vercel.app) |
| Backend  | Bonto         | [zylux.bonto.run](https://zylux.bonto.run)             |
| Database | MongoDB Atlas | Cloud hosted                                           |

## 📁 Project Structure

```
Zylux/
├── client/          # Next.js frontend
│   ├── src/
│   │   ├── app/         # Next.js app router pages
│   │   ├── components/  # Reusable UI components
│   │   ├── redux/       # Redux store & slices
│   │   └── utils/       # Helper functions
├── controllers/     # Express route controllers
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
└── server.js        # Entry point
```

## 🧪 Test Payment

Use Stripe test card to make a purchase:

| Field  | Value               |
| :----- | :------------------ |
| Card   | 4242 4242 4242 4242 |
| Expiry | Any future date     |
| CVV    | Any 3 digits        |

## Author

**Insharah Amna Shakir**

- GitHub: [@Insharah-amna](https://github.com/Insharah-amna)
