# 🚀 EddyHub - Modular SaaS Platform

<div align="center">

![EddyHub Logo](https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=EddyHub)

**A modern, scalable SaaS platform with role-based feature access control**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-green.svg)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**EddyHub** is a comprehensive SaaS platform built with a modern tech stack, featuring a sophisticated role-based permission system that allows granular feature access control. The platform enables administrators to manage feature requests from users, approve or reject access, and automatically grant permissions.

### Key Highlights

- 🔐 **Advanced Permission System** - Granular feature-level access control
- 👑 **Admin Dashboard** - Comprehensive admin panel for permission management
- 🌐 **Internationalization** - Full i18n support (Vietnamese & English)
- 🎨 **Modern UI/UX** - Glass-morphism design with smooth animations
- 🔄 **Real-time Updates** - Dynamic permission updates without page refresh
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🚀 **High Performance** - Optimized frontend and backend architecture

---

## ✨ Features

### 🔑 Authentication & Authorization

- **User Authentication**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Token refresh mechanism
  - Auto-logout on session expiry
- **Role-Based Access Control (RBAC)**
  - User and Admin roles
  - Route-level protection
  - Feature-level permissions
  - Dynamic permission checking

### 🎯 Feature Management

- **Feature Request System**

  - Users can request access to specific features
  - Bulk feature request submission
  - Request status tracking (Pending, Approved, Rejected)
  - Optional messages for requests and responses

- **Admin Permission Management**
  - Dashboard with statistics (Total, Pending, Approved, Rejected)
  - Request filtering by status
  - Approve/Reject workflow with confirmation
  - Auto-grant permissions on approval
  - Response messages to users

### 🎨 User Interface

- **Feature Selection Screen**

  - Visual feature cards with icons
  - Toggle-based selection
  - Shows unlocked features with badges
  - Redirects after every login
  - Multilingual feature names and descriptions

- **Admin Dashboard**
  - Statistics cards with color coding
  - Quick action links
  - Permission management interface
  - Request cards with user details
  - Responsive layout

### 🌍 Internationalization (i18n)

- **Multi-language Support**
  - Vietnamese (vi)
  - English (en)
  - Dynamic language switching
  - Localized feature content
  - Date/time formatting per locale

---

## 🛠 Tech Stack

### Frontend

| Technology       | Version | Purpose                          |
| ---------------- | ------- | -------------------------------- |
| **Vue.js**       | 3.5     | Progressive JavaScript framework |
| **TypeScript**   | 5.0     | Type-safe development            |
| **Vue Router**   | 4.x     | SPA routing                      |
| **Pinia**        | 2.x     | State management                 |
| **Vue i18n**     | 9.x     | Internationalization             |
| **Vite**         | 7.x     | Build tool & dev server          |
| **Tailwind CSS** | 3.x     | Utility-first CSS framework      |
| **Axios**        | 1.x     | HTTP client                      |

### Backend

| Technology     | Version | Purpose               |
| -------------- | ------- | --------------------- |
| **Node.js**    | 22.x    | Runtime environment   |
| **Express**    | 4.x     | Web framework         |
| **TypeScript** | 5.0     | Type-safe development |
| **MongoDB**    | 7.0     | NoSQL database        |
| **Mongoose**   | 8.x     | MongoDB ODM           |
| **JWT**        | 9.x     | Authentication tokens |
| **Bcrypt**     | 5.x     | Password hashing      |
| **Nodemailer** | 6.x     | Email service         |

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart on changes
- **ts-node** - TypeScript execution

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (Vue.js)                  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Auth      │  │   Features   │  │    Admin      │  │
│  │   Module    │  │   Module     │  │    Module     │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│         │                │                    │          │
│         └────────────────┴────────────────────┘          │
│                          │                               │
│                    ┌─────▼─────┐                         │
│                    │    API    │                         │
│                    │  Service  │                         │
│                    └─────┬─────┘                         │
└──────────────────────────┼─────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────▼─────────────────────────────┐
│                   Backend (Express.js)                  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │              Middleware Layer                    │  │
│  │  • Authentication  • Authorization  • CORS       │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐    │
│  │   Auth   │  │  Features │  │  Feature Requests│    │
│  │  Module  │  │  Module   │  │     Module       │    │
│  └────┬─────┘  └─────┬─────┘  └────────┬─────────┘    │
│       │              │                  │               │
│  ┌────▼──────────────▼──────────────────▼──────────┐   │
│  │           Permission Service                    │   │
│  │  • Grant/Revoke  • Check Access  • Get Features│   │
│  └─────────────────────┬───────────────────────────┘   │
└────────────────────────┼───────────────────────────────┘
                         │
┌────────────────────────▼───────────────────────────────┐
│                   MongoDB Database                      │
│  ┌────────┐  ┌──────────┐  ┌─────────────┐            │
│  │ Users  │  │ Features │  │ Permissions │            │
│  └────────┘  └──────────┘  └─────────────┘            │
│  ┌─────────────────────┐                               │
│  │  Feature Requests   │                               │
│  └─────────────────────┘                               │
└─────────────────────────────────────────────────────────┘
```

### Database Schema

#### Users Collection

```typescript
{
  _id: ObjectId,
  username: string,
  email: string,
  password: string (hashed),
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

#### Features Collection

```typescript
{
  _id: ObjectId,
  name: { vi: string, en: string },
  key: string (unique),
  description: { vi: string, en: string },
  icon: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Permissions Collection

```typescript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  feature: ObjectId (ref: Feature),
  isActive: boolean,
  grantedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

#### Feature Requests Collection

```typescript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  feature: ObjectId (ref: Feature),
  status: 'pending' | 'approved' | 'rejected',
  requestMessage?: string,
  responseMessage?: string,
  requestedAt: Date,
  reviewedBy?: ObjectId (ref: User),
  reviewedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 22.0.0
- **npm** >= 10.0.0
- **MongoDB** >= 7.0.0
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bigdady147/Eddy_Hub.git
   cd Eddy_Hub
   ```

2. **Install dependencies**

   **Backend:**

   ```bash
   cd server
   npm install
   ```

   **Frontend:**

   ```bash
   cd client
   npm install
   ```

3. **Environment Configuration**

   **Backend** - Create `server/.env`:

   ```env
   # Server
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/eddyhub

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d

   # Email (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=noreply@eddyhub.com

   # CORS
   CLIENT_URL=http://localhost:5173
   ```

   **Frontend** - Create `client/.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```

4. **Database Setup**

   Start MongoDB:

   ```bash
   # Windows
   mongod --dbpath C:\data\db

   # Linux/Mac
   mongod --dbpath /data/db
   ```

5. **Run the application**

   **Backend (Terminal 1):**

   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/v1

---

## 📁 Project Structure

```
Eddy_Hub/
├── client/                      # Frontend application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Images, styles, fonts
│   │   │   └── scss/            # SCSS stylesheets
│   │   ├── components/          # Shared components
│   │   ├── locales/             # i18n translation files
│   │   │   ├── vi.json         # Vietnamese
│   │   │   └── en.json         # English
│   │   ├── modules/             # Feature modules
│   │   │   ├── auth/            # Authentication module
│   │   │   │   ├── views/       # Login, Register, etc.
│   │   │   │   ├── stores/      # Pinia stores
│   │   │   │   └── auth.routes.ts
│   │   │   ├── core/            # Core module
│   │   │   │   ├── components/  # BaseButton, TheHeader, etc.
│   │   │   │   ├── layouts/     # MainLayout, AuthLayout
│   │   │   │   ├── stores/      # Toast store
│   │   │   │   ├── views/       # HomeView, FeatureSelection
│   │   │   │   └── core.routes.ts
│   │   │   └── admin/           # Admin module
│   │   │       ├── components/  # StatCard, RequestCard, etc.
│   │   │       ├── views/       # AdminDashboard, PermissionManagement
│   │   │       └── admin.routes.ts
│   │   ├── router/              # Vue Router configuration
│   │   ├── services/            # API services
│   │   │   ├── auth.service.ts
│   │   │   ├── feature.service.ts
│   │   │   └── feature-request.service.ts
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   ├── App.vue              # Root component
│   │   ├── main.ts              # Entry point
│   │   └── i18n.ts              # i18n configuration
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── server/                      # Backend application
    ├── src/
    │   ├── config/              # Configuration files
    │   │   └── database.ts      # MongoDB connection
    │   ├── middlewares/         # Express middlewares
    │   │   ├── auth.middleware.ts
    │   │   ├── role.middleware.ts
    │   │   └── error.middleware.ts
    │   ├── modules/             # Feature modules
    │   │   ├── auth/            # Authentication
    │   │   │   ├── auth.controller.ts
    │   │   │   ├── auth.service.ts
    │   │   │   └── auth.routes.ts
    │   │   ├── users/           # User management
    │   │   │   ├── user.model.ts
    │   │   │   ├── user.interface.ts
    │   │   │   └── user.service.ts
    │   │   ├── features/        # Feature management
    │   │   │   ├── feature.model.ts
    │   │   │   ├── feature.service.ts
    │   │   │   ├── feature.controller.ts
    │   │   │   └── feature.routes.ts
    │   │   ├── permissions/     # Permission system
    │   │   │   ├── permission.model.ts
    │   │   │   ├── permission.service.ts
    │   │   │   ├── permission.controller.ts
    │   │   │   ├── permission.routes.ts
    │   │   │   └── README.md
    │   │   └── feature-requests/  # Feature request system
    │   │       ├── feature-request.model.ts
    │   │       ├── feature-request.service.ts
    │   │       ├── feature-request.controller.ts
    │   │       ├── feature-request.routes.ts
    │   │       └── index.ts
    │   ├── utils/               # Utility functions
    │   ├── types/               # TypeScript types
    │   ├── app.ts               # Express app setup
    │   └── server.ts            # Entry point
    ├── .env                     # Environment variables
    ├── package.json
    ├── tsconfig.json
    └── nodemon.json
```

---

## 📚 API Documentation

### Authentication Endpoints

#### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "user": { ... },
    "features": [...]
  }
}
```

#### Get Current User

```http
GET /api/v1/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "features": [...]
  }
}
```

### Feature Endpoints

#### Get All Features

```http
GET /api/v1/features
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": { "vi": "Chuyển đổi Word sang PDF", "en": "Word to PDF Converter" },
      "key": "word_to_pdf",
      "description": { "vi": "...", "en": "..." },
      "icon": "📄",
      "isActive": true
    }
  ]
}
```

### Feature Request Endpoints (User)

#### Submit Bulk Feature Requests

```http
POST /api/v1/feature-requests/bulk
Authorization: Bearer <token>
Content-Type: application/json

{
  "featureIds": ["feature_id_1", "feature_id_2"]
}

Response:
{
  "success": true,
  "message": "Feature requests submitted successfully",
  "data": {
    "created": 2,
    "requests": [...]
  }
}
```

#### Get My Requests

```http
GET /api/v1/feature-requests/my-requests
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "user": "...",
      "feature": {...},
      "status": "pending",
      "requestedAt": "2026-01-14T00:00:00.000Z"
    }
  ]
}
```

#### Cancel Request

```http
DELETE /api/v1/feature-requests/:id
Authorization: Bearer <token>
```

### Feature Request Endpoints (Admin)

#### Get All Requests

```http
GET /api/v1/feature-requests
Authorization: Bearer <admin-token>

Response:
{
  "success": true,
  "data": [...]
}
```

#### Get Statistics

```http
GET /api/v1/feature-requests/stats
Authorization: Bearer <admin-token>

Response:
{
  "success": true,
  "data": {
    "total": 15,
    "pending": 5,
    "approved": 8,
    "rejected": 2
  }
}
```

#### Approve Request

```http
PATCH /api/v1/feature-requests/:id/approve
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "responseMessage": "Welcome! Enjoy the feature."
}

Response:
{
  "success": true,
  "message": "Request approved successfully",
  "data": {...}
}
```

#### Reject Request

```http
PATCH /api/v1/feature-requests/:id/reject
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "responseMessage": "Sorry, this feature is not available for your account type."
}
```

### Permission Endpoints (Admin)

#### Grant Permission

```http
POST /api/v1/permissions/grant
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "userId": "user_id",
  "featureId": "feature_id"
}
```

#### Revoke Permission

```http
DELETE /api/v1/permissions/revoke
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "userId": "user_id",
  "featureId": "feature_id"
}
```

---

## ⚙️ Configuration

### Frontend Configuration

**Vite Config** (`client/vite.config.ts`)

```typescript
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```

**Tailwind Config** (`client/tailwind.config.js`)

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        // ...
      },
    },
  },
};
```

### Backend Configuration

**MongoDB Connection** (`server/src/config/database.ts`)

```typescript
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
```

---

## 💻 Development

### Development Workflow

1. **Create a new feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**

   ```bash
   # Run tests (when available)
   npm test

   # Check types
   npm run type-check
   ```

3. **Commit changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guide

- Follow existing code patterns
- Use TypeScript for type safety
- Write meaningful commit messages (Conventional Commits)
- Add JSDoc comments for complex functions
- Keep components small and focused

### Available Scripts

**Frontend:**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run type-check # TypeScript type checking
```

**Backend:**

```bash
npm run dev        # Start development server with nodemon
npm run build      # Compile TypeScript
npm start          # Start production server
```

---

## 🚢 Deployment

### Production Build

**Frontend:**

```bash
cd client
npm run build
# Dist files will be in client/dist/
```

**Backend:**

```bash
cd server
npm run build
# Compiled JS will be in server/dist/
```

### Environment Variables (Production)

Ensure all production environment variables are set:

- Use strong JWT secrets
- Configure production MongoDB URI
- Set appropriate CORS origins
- Enable HTTPS in production

### Deployment Platforms

**Recommended platforms:**

- **Frontend:** Vercel, Netlify, Cloudflare Pages
- **Backend:** Railway, Render, DigitalOcean, AWS
- **Database:** MongoDB Atlas, DigitalOcean Managed MongoDB

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features (when testing is implemented)
- Update documentation as needed
- Be respectful and constructive

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **GitHub:** [@bigdady147](https://github.com/bigdady147)
- **Email:** truongan.dev3010@gmail.com
- **Issues:** [GitHub Issues](https://github.com/bigdady147/Eddy_Hub/issues)

---

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Express.js community
- MongoDB team
- All open-source contributors

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/bigdady147">bigdady147</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
