# 🔐 Fullstack Authentication System — Modern, Secure & Scalable

A **powerful** and **production-ready** fullstack authentication solution built with  
✨ **Next.js**, 🚀 **NestJS**, and 🐘 **PostgreSQL** — perfect for modern web applications.

This system provides:

✅ Email & Password Authentication  
🔐 OAuth Integration (Google, Yandex)  
🔑 Two-Factor Authentication (2FA)  
📩 Email Verification & Password Recovery  
🧠 reCAPTCHA Protection  
📦 Session & Token-based Auth with Secure Cookies  
⚙️ Modular Architecture — easily extendable & customizable

Crafted for **performance**, **security**, and **developer experience**, this project is ideal for startups, SaaS products, internal dashboards, and any app that requires robust user authentication.

---

## 📂 Project Structure

```
├── apps
│   ├── frontend (Next.js)
│   └── backend (NestJS)
```

---

## ⚙️ Core Features

- **Authentication**
  - Email & Password login
  - OAuth via Google, Yandex
  - Two-Factor Authentication (2FA)
- **Authorization**
  - JWT-based with guards and decorators
- **User Management**
  - Profile update, settings page
- **Email Features**
  - Email verification via token
  - Password reset workflow
  - SMTP integration
- **Security**
  - reCAPTCHA validation
  - Brute-force protection (future roadmap)
- **API**
  - REST API structure following NestJS best practices
- **Database**
  - PostgreSQL with Prisma ORM

---

## 🧱 Architecture Overview

- **Frontend Layer (Next.js + TypeScript)**
  - Pages: login, register, dashboard, settings, etc.
  - Features: modular auth/user logic
  - Shared: API client, UI components, theme/toast providers
  - Integration with backend via REST

- **Backend Layer (NestJS + TypeScript)**
  - `AuthModule`: core authentication logic (JWT, OAuth, 2FA, email tokens)
  - `UserModule`: profile management
  - `MailModule`: email dispatch via SMTP
  - `PrismaModule`: database operations
  - Guards and interceptors for access control

- **External Services**
  - SMTP Mail Server
  - Google/Yandex OAuth
  - Google reCAPTCHA

---

## 🧪 Tech Stack

| Layer      | Tech                                                      |
|------------|-----------------------------------------------------------|
| Frontend   | ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white) ![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| Backend    | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| ORM        | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white) |
| Database   | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) |
| Mail       | ![SMTP](https://img.shields.io/badge/SMTP-Mail-4A4A4A) |
| Security   | ![OAuth](https://img.shields.io/badge/OAuth-Google%2FYandex-4285F4?logo=google&logoColor=white) ![reCAPTCHA](https://img.shields.io/badge/reCAPTCHA-4285F4?logo=google&logoColor=white) |

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fullstack-auth.git
cd fullstack-auth
```

### 2. Configure environment variables

#### 📦 `nestjs-server/.env`

```
NODE_ENV='development'
APPLICATION_PORT=4000
APPLICATION_URL='http://localhost:${APPLICATION_PORT}'
ALLOWED_ORIGIN='http://localhost:3000'

DATABASE_URL=postgres://neondb_owner:***@ep-aged-cherry-...neon.tech/neondb?sslmode=require
REDIS_URI='rediss://default:***@fullstack-authorization-...aivencloud.com:12005'

COOKIES_SECRET='secret'
SESSION_SECRET='secret'
SESSION_NAME='session'
SESSION_DOMAIN='localhost' 
SESSION_MAX_AGE='30d'
SESSION_HTTP_ONLY=true
SESSION_SECURE=false
SESSION_FOLDER='sessions:'

GOOGLE_RECAPTCHA_SECRET_KEY="6LeLYfYqAAAAANsZJ2-HOIp6Wq6LkSakRZc1q64Q"

GOOGLE_CLIENT_ID="65183767107-..."
GOOGLE_CLIENT_SECRET="GOCSPX-..."

YANDEX_CLIENT_ID="aa524495782b4b63896102f9aaf39ad7"
YANDEX_CLIENT_SECRET="b2c9644b948d422e96566ce6f99ee4b3"

MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_LOGIN="your_email@gmail.com"
MAIL_PASSWORD="your_app_password"
```

#### 🧭 `frontend/.env`

```
SERVER_URL='http://localhost:4000'
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY='6LeLYfYqAAAAAKwlqO_A7pqutDIiRfCiMF4iTqHQ'
```

---

### 3. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd nestjs-server
npm install
```

### 4. Run the project

```bash
# Start backend
npm run start:dev

# Start frontend
npm run dev

```

---

## 🔐 Authentication Flow

- **Registration** → Email verification token
- **Login** → JWT access token + optional 2FA
- **Forgot password** → Email reset link
- **OAuth** → Google/Yandex with fallback to email/password
- **Protected routes** → Role-based access (with guards)

---

## 🗺️ Roadmap

- [ ] Admin panel for user management
- [ ] Rate limiting and brute-force protection
- [ ] Multi-language support
- [ ] WebSocket integration for real-time events
- [ ] CI/CD pipeline configuration

---

> For recruiters: this system demonstrates deep knowledge of modern web architecture, security best practices, and production-grade scalability across both frontend and backend.
