# Argho Chakma Portfolio

[![Vue](https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-API-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

A full-stack developer portfolio built with Vue 3, Vite, Tailwind CSS, ASP.NET Core, PostgreSQL, JWT authentication, and Cloudinary image uploads.

The portfolio presents selected projects, project details, live links, GitHub links, gallery images, and a protected admin dashboard for managing portfolio content without editing source code manually.

## Live Demo

- Portfolio: https://argho-chakma.vercel.app
- Production API: https://argho-portfolio-api.onrender.com

## Why This Project Matters

This is not only a static portfolio website. It is a full-stack portfolio management system with a public-facing frontend and a secure admin workflow.

It demonstrates practical experience with:

- Modern frontend development using Vue 3, Vite, and Tailwind CSS
- REST API development with ASP.NET Core
- PostgreSQL database modeling with Entity Framework Core
- JWT-based admin authentication
- Protected admin routes
- Project CRUD operations
- Image upload workflow using Cloudinary
- Deployment-ready frontend and backend separation

## Core Features

### Public Portfolio

- Home page for personal branding
- Projects listing page
- Individual project details page
- Project gallery support
- Live project and GitHub links
- About page
- Contact page
- Responsive frontend structure

### Admin Dashboard

- Admin login
- JWT token-based authentication
- Protected admin routes
- Create new projects
- Edit existing projects
- Delete projects
- Upload project images
- Manage tech stack, gallery images, live links, and GitHub links

### Backend API

- ASP.NET Core Web API
- PostgreSQL database integration
- Entity Framework Core model configuration
- JWT authentication and authorization
- Project CRUD endpoints
- Slug-based project lookup
- Cloudinary image upload endpoint
- Health check endpoint
- CORS configuration for local and production frontend URLs

## Tech Stack

### Frontend

- Vue 3
- Vite
- Vue Router
- Tailwind CSS
- Font Awesome
- TipTap editor packages
- DOMPurify
- AOS animations

### Backend

- ASP.NET Core / .NET 9
- C#
- Entity Framework Core
- PostgreSQL
- JWT Bearer Authentication
- Cloudinary
- Docker

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL-compatible hosting
- Image Storage: Cloudinary

## Project Structure

```txt
arghochakma/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── images/
│   │   ├── router/
│   │   ├── services/
│   │   └── views/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
│
└── backend/
    └── Portfolio.Api/
        ├── Controllers/
        ├── Data/
        ├── Dtos/
        ├── Models/
        ├── Dockerfile
        ├── Program.cs
        └── Portfolio.Api.csproj
```

## API Overview

### Public Endpoints

```http
GET /api/health
GET /api/projects
GET /api/projects/{id}
GET /api/projects/slug/{slug}
```

### Admin Endpoints

```http
POST   /api/auth/login
POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}
POST   /api/uploads/image
```

Admin-only endpoints require a valid JWT token.

## Environment Variables

### Frontend

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

For production, set this to your deployed backend URL.

### Backend

Create backend environment variables or user secrets:

```env
ConnectionStrings__DefaultConnection=your_postgresql_connection_string
Jwt__Key=your_secure_jwt_secret_key
Jwt__Issuer=Portfolio.Api
Jwt__Audience=Portfolio.Admin
Admin__Username=your_admin_username
Admin__Password=your_admin_password
Cloudinary__CloudName=your_cloudinary_cloud_name
Cloudinary__ApiKey=your_cloudinary_api_key
Cloudinary__ApiSecret=your_cloudinary_api_secret
Cors__AllowedOrigins__0=http://localhost:5173
Cors__AllowedOrigins__1=https://argho-chakma.vercel.app
```

Do not commit real secrets to GitHub.

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/ArghoPH/arghochakma.git
cd arghochakma
```

### 2. Run the Backend

```bash
cd backend/Portfolio.Api
dotnet restore
dotnet run
```

The backend should run locally on the configured ASP.NET Core port.

### 3. Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Production Build

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

### Backend

```bash
cd backend/Portfolio.Api
dotnet publish -c Release
```

## Docker Support

The backend includes a Dockerfile for deployment-ready builds.

```bash
cd backend/Portfolio.Api
docker build -t portfolio-api .
docker run -p 10000:10000 portfolio-api
```

## What I Focused On

While building this portfolio, I focused on making the project realistic instead of only visual. A recruiter or client can see not just the final UI, but also the backend structure, database model, admin authentication, image upload workflow, and deployment approach.

## Future Improvements

- Add automated tests for backend endpoints
- Add GitHub Actions for CI/CD
- Add Lighthouse score screenshots
- Add project case studies with problem, solution, stack, and outcome
- Add SEO metadata for each project page
- Add analytics for portfolio visits and project link clicks
- Add a short demo video of the admin dashboard workflow

## Contact

For work opportunities, collaboration, or freelance projects, contact me through the portfolio website:

https://argho-chakma.vercel.app
