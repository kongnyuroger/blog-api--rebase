# Blog API with Commenting System

A RESTful backend API built with **Node.js**, **Express**, and **PostgreSQL**.  
This project simulates a simple blogging platform where users can register, log in, create posts, add comments, and upload profile pictures.

---
## Quick start
1. clone project
    ```bash
   git https://github.com/kongnyuroger/blog-api--rebase.git
   cd  blog-api--rebase
   ```
2. Install dependencies
   ```bash
   npm i
   ```
3. Run dev server
   ```bash
   npm run dev
   ```
3. Set up environment variables
   - By default, the app expects the backend at `http://localhost:5000`.
   - Deployment url : 'https://blog-api-rebase.onrender.com'

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

POST /auth/register – Register new user(username, email, password)

POST /auth/login – Login user(email, password)

GET /me – Get logged-in user info

Profile

POST /profile_upload – Upload profile picture

Posts

GET /posts?limit=10&offset=0 – List posts (with pagination)

GET /posts/:id – Get single post with comments

POST /posts – Create post (title, content)

PUT /posts/:id – Update post (titiel, content)

DELETE /posts/:id – Delete post and its comments

Comments



POST comments/posts/:id – Add comment to a post(comment)

DELETE /comments/:id – Delete comment

Search

GET posts/search?q=keyword – Search posts by title or content
