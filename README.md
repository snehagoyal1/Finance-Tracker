# 💰 Full Stack Personal Finance Tracker

A complete, secure, and performance-optimized personal finance management application built with the **MERN stack** (using PostgreSQL instead of MongoDB). It empowers users to manage their income and expenses, and gain insights through an interactive analytics dashboard.

---

## ✨ Features

* 🔐 **User Authentication**

  * Secure JWT-based login and registration
  * Role-Based Access Control (RBAC): `admin`, `user`, and `read-only` roles

* 💸 **Transaction Management**

  * Add, edit, delete income and expense entries
  * Categorize and filter transactions

* 📊 **Financial Analytics Dashboard**

  * Monthly/yearly trends
  * Income vs Expense comparisons
  * Category-wise breakdown with interactive charts

* ⚙️ **Performance Enhancements**

  * Redis caching for analytics and static data
  * API rate limiting per route type
  * Pagination for transaction lists
  * Lazy loading and virtual scrolling

* 🧱 **Secure & Scalable Backend**

  * XSS and SQL injection protection
  * Role-based middleware access
  * Caching invalidation on updates

* 🌃 **Theme Switching**

  * Light/Dark mode support using global context

---

## 🛠️ Tech Stack

| Layer    | Tech                                               |
| -------- | -------------------------------------------------- |
| Frontend | React 18+, TypeScript, Vite, Recharts, CSS Modules |
| Backend  | Node.js, Express.js                                |
| Database | PostgreSQL                                         |
| Caching  | Redis (Upstash or equivalent)                      |
| Docs     | Swagger / OpenAPI                                  |

---

## 📜 API Documentation

All backend routes are documented using **Swagger UI**. After starting the backend server, access the documentation at:

👉 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Includes:

* Full route details and models
* JWT-based authorization with bearer tokens
* Role-restricted routes and responses

---

## 🚀 Local Development Setup

### Prerequisites

* Node.js v18+
* Git
* A cloud PostgreSQL database (e.g. [Neon](https://neon.tech))
* A cloud Redis instance (e.g. [Upstash](https://upstash.com))
* API client (like Postman)

---

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd personal-finance-tracker
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

🔧 **Update `.env` with:**

* `DATABASE_URL` → PostgreSQL connection string
* `REDIS_URL` → Redis connection string (prefer `rediss://`)
* `JWT_SECRET` → A secure random secret

```bash
# Initialize database tables and seed demo data
npm run db:init

# Start backend server
npm run dev
```

🟢 Server running at: `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

🔧 Set:

* `VITE_API_BASE_URL=http://localhost:5000/api`

```bash
npm run dev
```

🟢 Frontend running at: `http://localhost:5173`

---

## 🔑 Demo Credentials

| Role               | Email                                               | Password            |
| ------------------ | --------------------------------------------------- | ------------------- |
| **Admin**          | [admin@example.com](mailto:admin@example.com)       | AdminPassword123    |
| **User** (default) | [user@example.com](mailto:user@example.com)         | UserPassword123     |
| **Read-Only**      | [readonly@example.com](mailto:readonly@example.com) | ReadOnlyPassword123 |

> ⚠️ To enable the admin role, manually update the user’s role in your database after registration.

---

## ✅ Project Highlights

* 🔐 JWT + RBAC secured APIs
* 📄 Fully interactive API docs with Swagger
* 📊 Dynamic charts with Recharts
* ⚡ Redis caching + rate limiting
* 🧠 Optimized with React hooks: `useContext`, `useMemo`, `useCallback`

---

> Crafted for performance, clarity, and scalability. Happy budgeting! 💼
