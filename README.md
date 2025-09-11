# Blog API with Commenting System

A RESTful backend API built with **Node.js**, **Express**, and **PostgreSQL**.  
This project simulates a simple blogging platform where users can register, log in, create posts, add comments, and upload profile pictures.

---

## 🚀 Features
- User authentication (register, login)
- Profile picture upload
- CRUD operations for posts and comments
- Pagination support for posts
- Search posts by keyword
- Cascading deletes for data integrity
- Global error handling with JSON responses

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **ORM/Queries:** pg (node-postgres)
- **Middleware:** Multer (file uploads), Morgan (logging)

---

API Endpoints
Authentication

POST /auth/register – Register new user

POST /auth/login – Login user

GET /me – Get logged-in user info

Profile

POST /profile_upload – Upload profile picture

Posts

GET /posts?limit=10&offset=0 – List posts (with pagination)

GET /posts/:id – Get single post with comments

POST /posts – Create post

PUT /posts/:id – Update post

DELETE /posts/:id – Delete post and its comments

Comments

GET /posts/:id/comments – List comments for a post

POST /posts/:id/comments – Add comment to a post

DELETE /comments/:id – Delete comment

Search

GET /search?q=keyword – Search posts by title or content
