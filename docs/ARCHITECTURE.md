# Architecture Overview

## Project Structure

The project follows a **Monorepo** structure with separate directories for Backend (`server`) and Frontend (`client`).

### Backend (Node.js + Express)

The backend adopts a **Modular Monolith** architecture. This means the codebase is organized by business domains (modules) rather than technical layers.

**Structure:**

```
server/src/
├── core/             # Core infrastructure (Logger, ApiError, ApiResponse)
├── middlewares/      # Global middlewares (Error, Validate, Auth)
├── modules/          # Feature modules
│   ├── auth/         # Authentication Module
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   └── auth.validation.ts
│   └── users/        # User Module
├── config/           # Configuration (Env vars)
└── utils/            # Shared utilities
```

### Frontend (Vue 3 + TypeScript)

The frontend also follows a **Modular** pattern to match the backend structure, ensuring consistency and scalability.

**Structure:**

```
client/src/
├── assets/
│   └── scss/         # Global Styles (SCSS)
├── modules/          # Feature Modules
│   ├── auth/         # Auth Module (Views, Stores, Services)
│   └── core/         # Core Components (BaseInput, BaseButton)
├── constants/        # Global Constants (API_URL, STORAGE_KEYS)
├── router/           # Vue Router
└── utils/            # Shared Utilities (API Client)
```

## Tech Stack

### Core

- **Runtime**: Node.js
- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript (Strict Mode)
- **Database**: MongoDB (Mongoose ODM)

### Libraries & Tools

- **State Management**: Pinia
- **Styling**: TailwindCSS v4 + SCSS
- **Validation**:
  - Backend: Zod
  - Frontend: Vee-Validate + Zod
- **Logging**: Winston + MongoDB
