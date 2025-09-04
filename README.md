# 📚 Books & Video API

Sebuah API sederhana menggunakan **Express.js** dengan **JWT Authentication** untuk mengelola data buku dan pemutaran video.

---

## 🚀 Fitur

- Autentikasi menggunakan **JWT Token**
- **Books API** → Ambil daftar buku (dengan proteksi JWT)
- **Video API** → Memutar video (dengan proteksi JWT)
- Middleware logging request & response

---

## ⚙️ Instalasi

1. Clone repository ini:
   ```bash
   git clone https://github.com/ehroy/books-video-api.git
   cd books-video-api
   ```
   POST /login
   {
   "username": "admin",
   "password": "12345"
   }
   Response (200)
   {
   "success": true,
   "token": "your_jwt_token_here"
   }
   Response (401)
   {
   "success": false,
   "message": "Invalid credentials"
   }

GET /api/books
Authorization: Bearer <your_token>
Response (200)
{
"success": true,
"data": [
{ "id": 1, "title": "Book 1", "author": "Author 1" },
{ "id": 2, "title": "Book 2", "author": "Author 2" }
]
}

Response (401)
{
"success": false,
"message": "No token provided"
}

POST /api/video/play
Authorization: Bearer <your_token>
request body
{
"id": "abc123"
}
Response (200)
{
"success": true,
"response": "https://example.com/videos/abc123.mp4"
}

Response (401)
{
"success": false,
"message": "Video not found"
}
