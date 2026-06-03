<h1 align="center">📝 Blog API</h1>

<p align="center">
  A RESTful API for a full-featured blogging platform — supporting authenticated users, rich post management, threaded comments, and profile picture uploads.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
  - [Health Check](#health-check)
  - [Authentication](#authentication)
  - [Posts](#posts)
  - [Comments](#comments)
  - [Profile](#profile)
- [Authentication](#-authentication-flow)
- [Error Handling](#-error-handling)

---

## 🌐 Overview

Blog API is a backend service built with **Express.js** and **PostgreSQL** that powers a complete blogging platform. It exposes a clean, RESTful API for:

- User registration and JWT-based authentication
- Creating, reading, updating, and deleting blog posts
- Commenting on posts
- Uploading profile pictures
- Searching posts by keyword

---

## 🛠 Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Runtime       | Node.js (ES Modules)    |
| Framework     | Express.js v5           |
| Database      | PostgreSQL (`pg`)       |
| Auth          | JSON Web Tokens (`jwt`) |
| Password Hash | bcrypt                  |
| File Uploads  | Multer                  |
| Logger        | Morgan                  |
| Dev Server    | Nodemon                 |

---

## 📁 Project Structure

```
blog-api--rebase/
├── src/
│   ├── app.js                  # Express app setup & route mounting
│   ├── bin/www                 # HTTP server entry point
│   ├── config/
│   │   └── dbinit.js           # PostgreSQL connection initializer
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── upload.js           # Multer file upload middleware
│   └── modules/
│       ├── user/
│       │   ├── user.routes.js
│       │   ├── user.controller.js
│       │   ├── user.service.js
│       │   ├── user.model.js
│       │   ├── profile.router.js
│       │   └── profilePic.controller.js
│       ├── post/
│       │   ├── post.routes.js
│       │   ├── post.controller.js
│       │   ├── post.services.js
│       │   └── post.model.js
│       └── comment/
│           ├── comment.routes.js
│           ├── comment.controller.js
│           ├── comment.services.js
│           └── comment.model.js
├── uploads/                    # Uploaded profile pictures (gitignored)
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **PostgreSQL** v14+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/blog-api--rebase.git
cd blog-api--rebase

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials and JWT secret

# 4. Start the development server
npm run dev
```

The API will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory. Use `.env.example` as a template:

```env
SECRET_KEY=your_jwt_secret_key

DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=your_db_password
```

| Variable    | Description                              |
|-------------|------------------------------------------|
| `SECRET_KEY` | Secret used to sign JWT tokens          |
| `DB_HOST`   | PostgreSQL host                           |
| `DB_PORT`   | PostgreSQL port (default: `5432`)         |
| `DB_NAME`   | Name of the PostgreSQL database           |
| `DB_USER`   | PostgreSQL username                       |
| `DB_PASSWORD` | PostgreSQL password                     |

---

## 📡 API Reference

All endpoints return JSON. Protected routes require a `Bearer` token in the `Authorization` header.

```
Authorization: Bearer <your_token>
```

---

### Health Check

| Method | Endpoint | Auth | Description        |
|--------|----------|------|--------------------|
| GET    | `/`      | No   | Server health check |

**Response `200 OK`:**
```json
{
  "status": "ok",
  "message": "Blog API is running"
}
```

---

### Authentication

Base path: `/auth`

| Method | Endpoint          | Auth | Description             |
|--------|-------------------|------|-------------------------|
| POST   | `/auth/register`  | No   | Register a new user     |
| POST   | `/auth/login`     | No   | Login and receive token |
| GET    | `/auth/me`        | ✅ Yes | Get current user info |

**`POST /auth/register` — Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**`POST /auth/login` — Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**`POST /auth/login` — Response `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Posts

Base path: `/posts`

| Method | Endpoint          | Auth   | Description              |
|--------|-------------------|--------|--------------------------|
| GET    | `/posts`          | No     | List all posts           |
| GET    | `/posts/search`   | No     | Search posts by keyword  |
| GET    | `/posts/:id`      | ✅ Yes | Get a single post        |
| POST   | `/posts`          | ✅ Yes | Create a new post        |
| PUT    | `/posts/:id`      | ✅ Yes | Update a post            |
| DELETE | `/posts/:id`      | ✅ Yes | Delete a post            |

**`POST /posts` — Request Body:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of the post..."
}
```

**`GET /posts/search` — Query Parameters:**
```
GET /posts/search?q=javascript
```

---

### Comments

Base path: `/comments`

| Method | Endpoint                   | Auth   | Description              |
|--------|----------------------------|--------|--------------------------|
| POST   | `/comments/posts/:id`      | ✅ Yes | Add a comment to a post  |
| DELETE | `/comments/:id`            | ✅ Yes | Delete a comment         |

**`POST /comments/posts/:id` — Request Body:**
```json
{
  "content": "Great post, really enjoyed reading this!"
}
```

---

### Profile

Base path: `/profile_upload`

| Method | Endpoint          | Auth   | Description                 |
|--------|-------------------|--------|-----------------------------|
| POST   | `/profile_upload` | ✅ Yes | Upload a profile picture    |

**Request:** `multipart/form-data` with a `profile` field containing the image file.

Uploaded images are served statically at:
```
GET /uploads/<filename>
```

---

## 🔑 Authentication Flow

```
1.  POST /auth/register   →  Create account
2.  POST /auth/login      →  Receive JWT token
3.  Add token to headers  →  Authorization: Bearer <token>
4.  Access protected routes
```

Tokens are verified on every protected route using the `authenticateToken` middleware (`src/middleware/auth.js`).

---

## ⚠️ Error Handling

All errors are returned in a consistent JSON format:

```json
{
  "error": "Error message describing the problem"
}
```

| Status Code | Meaning                              |
|-------------|--------------------------------------|
| `200`       | Success                              |
| `201`       | Resource created                     |
| `400`       | Bad request / validation error       |
| `401`       | Unauthorized — missing or invalid token |
| `403`       | Forbidden — insufficient permissions |
| `404`       | Resource not found                   |
| `500`       | Internal server error                |

---

## 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">Built with ❤️ using Node.js & Express</p>
