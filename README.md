# 📚 Library Management System API

<p align="center">

A production-ready **Library Management System REST API** built with **Node.js**, **Express.js**, and **MongoDB** following modern backend development practices. The application provides secure authentication, role-based authorization, book management, borrowing workflows, member management, Swagger API documentation, centralized logging, and automated testing.

</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)
![Jest](https://img.shields.io/badge/Test-Jest-C21325?logo=jest)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

# ✨ Features

## 🔐 Authentication

* JWT Authentication
* Member Registration
* Librarian Registration *(Development Only)*
* Secure Login
* Password Hashing using bcrypt

## 👥 Authorization

* Role-Based Access Control (RBAC)
* Member Permissions
* Librarian Permissions
* Protected Routes

## 📚 Book Management

* Create Book
* Update Book
* Delete Book
* View All Books
* View Book Details
* Search Books
* Filter Books by Category

## 📖 Borrow Management

* Borrow Books
* Return Borrowed Books
* View Borrowed Books

## 👤 Member Management

* View Members
* Delete Members

## 📖 API Documentation

* Swagger UI
* OpenAPI Specification

## 🧪 Testing

* Unit & Integration Tests
* Jest
* Supertest
* MongoDB Memory Server

---

# 🏗 System Architecture

```text
                           Client
                              │
                              ▼
                     Express Routes
                              │
                 Authentication Middleware
                              │
                  Authorization Middleware
                              │
                   Request Validation Layer
                              │
                         Controllers
                              │
                           Services
                              │
                         Mongoose ODM
                              │
                           MongoDB
```

---

# 🛠 Tech Stack

| Category             | Technology        |
| -------------------- | ----------------- |
| 🚀 Runtime           | Node.js           |
| ⚡ Framework          | Express.js        |
| 🗄 Database          | MongoDB           |
| 🔗 ODM               | Mongoose          |
| 🔐 Authentication    | JWT               |
| 🔑 Password Hashing  | bcrypt            |
| ✅ Validation         | express-validator |
| 📚 API Documentation | Swagger UI        |
| 📄 Logging           | Morgan + Winston  |
| 🧪 Testing           | Jest + Supertest  |

---

# 📁 Project Structure

```text
library-management-system/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── docs/
│   ├── logger/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── helpers/
│   ├── setup.js
│   ├── auth.test.js
│   ├── book.test.js
│   ├── borrow.test.js
│   └── member.test.js
│
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

---

# ⚙️ Project Setup

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd library-management-system
```

## Install Dependencies

```bash
npm install
```

---

# 📦 Installation Steps

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/library-management

JWT_SECRET=your-secret-key

NODE_ENV=development
```

| Variable    | Description               |
| ----------- | ------------------------- |
| PORT        | Application Port          |
| MONGODB_URI | MongoDB Connection String |
| JWT_SECRET  | Secret key for JWT        |
| NODE_ENV    | Environment               |

---

# 🗄 Database Setup

## Option 1 — Local MongoDB

Install MongoDB Community Edition.

Create a database:

```
library-management
```

Collections will be automatically created:

```
users
books
borrows
```

---

## Option 2 — MongoDB Atlas

1. Create a Cluster
2. Create Database User
3. Whitelist IP Address
4. Copy Connection String
5. Update

```env
MONGODB_URI=<your-mongodb-atlas-connection-string>
```

---

# ▶️ Running the Project

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# 🧪 Running Tests

Run all tests

```bash
npm test
```

Watch Mode

```bash
npm run test:watch
```

Individual Tests

```bash
npm test tests/auth.test.js
```

```bash
npm test tests/book.test.js
```

```bash
npm test tests/member.test.js
```

```bash
npm test tests/borrow.test.js
```

---

# 📖 API Documentation

After starting the server, open:

```
http://localhost:5000/api-docs
```

Swagger UI provides interactive API documentation with request and response examples.

---

# 🔑 Authentication

Protected APIs require JWT Authentication.

Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 API Reference

## Authentication

| Method | Endpoint                                            | Access |
| ------ | --------------------------------------------------- | ------ |
| POST   | `/api/auth/register`                                | Public |
| POST   | `/api/auth/register-librarian` *(Development Only)* | Public |
| POST   | `/api/auth/login`                                   | Public |

---

## Books

| Method | Endpoint         | Access            |
| ------ | ---------------- | ----------------- |
| POST   | `/api/books`     | Librarian         |
| GET    | `/api/books`     | Member, Librarian |
| GET    | `/api/books/:id` | Member, Librarian |
| PUT    | `/api/books/:id` | Librarian         |
| DELETE | `/api/books/:id` | Librarian         |

---

## Borrow

| Method | Endpoint                | Access |
| ------ | ----------------------- | ------ |
| POST   | `/api/books/:id/borrow` | Member |
| POST   | `/api/books/:id/return` | Member |

---

## Members

| Method | Endpoint                | Access    |
| ------ | ----------------------- | --------- |
| GET    | `/api/members`          | Librarian |
| DELETE | `/api/members/:id`      | Librarian |
| GET    | `/api/members/me/books` | Member    |

---

# 📚 Example Requests

## Register Member

```http
POST /api/auth/register
```

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

---

## Login

```http
POST /api/auth/login
```

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

---

## Create Book

```http
POST /api/books
```

```json
{
    "title": "Atomic Habits",
    "author": "James Clear",
    "isbn": "9781234567890",
    "category": "Self Help",
    "quantity": 10
}
```

---

## Borrow Book

```http
POST /api/books/{bookId}/borrow
```

---

## Return Book

```http
POST /api/books/{bookId}/return
```

---

# 🔒 Authorization Matrix

| Feature                | Member |        Librarian       |
| ---------------------- | :----: | :--------------------: |
| Register               |    ✅   | ✅ *(Development Only)* |
| Login                  |    ✅   |            ✅           |
| View Books             |    ✅   |            ✅           |
| Search Books           |    ✅   |            ✅           |
| Borrow Books           |    ✅   |            ❌           |
| Return Books           |    ✅   |            ❌           |
| View My Borrowed Books |    ✅   |            ❌           |
| Create Book            |    ❌   |            ✅           |
| Update Book            |    ❌   |            ✅           |
| Delete Book            |    ❌   |            ✅           |
| View Members           |    ❌   |            ✅           |
| Delete Members         |    ❌   |            ✅           |

---

# 🛡 Validation

The application validates:

* Required Fields
* Email Format
* Password Strength
* MongoDB ObjectIds
* Duplicate Users
* Duplicate ISBNs
* Book Availability
* Role-Based Permissions

---

# 📊 HTTP Status Codes

| Status | Description           |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 500    | Internal Server Error |

---

# 📝 Logging

The application uses:

* **Morgan** for HTTP request logging.
* **Winston** for application and error logging.

Logged Events:

* Incoming Requests
* Response Status
* Errors
* Database Connection
* Server Startup

---

# 🧪 Testing Strategy

The project includes comprehensive tests covering:

* Authentication
* Book Management
* Member Management
* Borrow & Return Flow
* Request Validation
* Authorization
* Error Handling
* Business Logic

Testing Tools:

* Jest
* Supertest
* MongoDB Memory Server

---

# 🚀 Future Improvements

* Refresh Token Authentication
* Fine Management
* Book Reservation System
* Email Notifications
* Docker Support
* CI/CD Pipeline
* Redis Caching
* Rate Limiting
* Pagination Metadata
* Prometheus Metrics

---

# 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Vamshi**

Backend Developer | Node.js | Express.js | MongoDB

---

## 📌 Notes

* Swagger UI is available at **`/api-docs`**.
* Librarian registration endpoint is provided **only for development/testing**. The original assignment expects librarian accounts to be inserted directly into the database.
* All protected endpoints require a valid JWT token in the `Authorization` header.
* The project follows a layered architecture with **Routes → Middleware → Controllers → Services → Models**, promoting separation of concerns and maintainability.

---

⭐ **If you found this project useful, consider giving it a star!**
