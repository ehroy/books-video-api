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

2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npm start
   ```

---

## 🔐 Autentikasi

### Login

**Endpoint:** `POST /login`

**Request Body:**

```json
{
  "username": "admin",
  "password": "12345"
}
```

**Response (200):**

```json
{
  "success": true,
  "token": "your_jwt_token_here"
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 📖 Books API

### Ambil Daftar Buku

**Endpoint:** `GET /api/books`

**Headers:**

```
Authorization: Bearer <your_token>
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    { "id": 1, "title": "Book 1", "author": "Author 1" },
    { "id": 2, "title": "Book 2", "author": "Author 2" }
  ]
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "No token provided"
}
```

---

## 🎥 Video API

### Putar Video

**Endpoint:** `POST /api/video/play`

**Headers:**

```
Authorization: Bearer <your_token>
```

**Request Body:**

```json
{
  "id": "abc123"
}
```

**Response (200):**

```json
{
  "success": true,
  "response": "https://example.com/videos/abc123.mp4"
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "Video not found"
}
```

---

## 🛠️ Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **JWT (JSON Web Token)**
- **Middleware untuk logging**

---

## 📝 Lisensi

MIT License
