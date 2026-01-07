
# Code Deterministic AI

A full-stack web application with a **separated frontend and backend architecture**, designed for clean API communication, authentication using JWT, and cloud deployment using modern tools.

---

## 📂 Project Structure

```

PROJECT_1/
├── Backend/
│   ├── package.json
│   ├── server.js
│   ├── .env            (ignored)
│   ├── .env.example
│   └── src/
│
├── Frontend/
│   ├── package.json
│   ├── .env            (ignored)
│   ├── .env.example
│   └── src/
│
├── .gitignore
└── README.md

```

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML / CSS
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- MongoDB (or any DB you configure)

### Deployment
- **Frontend**: Netlify / Vercel
- **Backend API**: Render (Web Service)

---

## 🔐 Authentication

- Uses **JWT (Bearer Token)**
- Token must be sent via HTTP headers:

```

Authorization: Bearer <token>

````

❌ Tokens are **never** sent in URLs.

---

## ⚙️ Environment Variables

### Backend (`Backend/.env.example`)
```env
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_jwt_secret
````
BACKEND_API_URL=https://code-determinsitic-ai.onrender.com


### Frontend (`Frontend/.env.example`)

```env
VITE_API_URL=https://your-backend.onrender.com
```

> `.env` files are ignored for security.
> Copy `.env.example` → `.env` and fill real values locally.

---

## 🛠️ Local Development

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 Deployment Notes

### Backend (Render)

* Service Type: **Web Service**
* Root Directory: `Backend`
* Build Command:

```bash
npm install
```

* Start Command:

```bash
npm start
```

* Uses `process.env.PORT` (Render assigns port automatically)

### Frontend

* Static deployment
* API base URL set via `VITE_API_URL`

---

## ✅ Best Practices Followed

* Monorepo structure
* `.gitignore` at root
* `.env` files never committed
* `.env.example` committed for setup clarity
* Proper separation of frontend & backend
* Secure JWT handling

---

## 📌 Status

Project is actively being developed and deployed for learning and production-style practice.

---

## 👤 Author

**Manmohan Shukla**
Electrical Engineering Undergraduate
Aspiring Backend / AI Engineer

---

## 📄 License

This project is for educational and personal use.

```

---
```
