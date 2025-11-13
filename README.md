# MyBlog (MERN)

A MERN blog application built for the Week 4 assignment. It demonstrates full-stack integration with authentication, file uploads, category management, and CRUD operations for posts.

## Features

- User authentication (register / login)
- Create, edit, delete posts (with featured image uploads)
- Categories management and filtering
- Post list and single post views
- Pagination and basic search/filter support
- Backend comments support (frontend UI optional)

## Quickstart

Prerequisites: Node.js (v18+), MongoDB (local or Atlas)

1. Server

```powershell
cd server
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

2. Client

```powershell
cd client
cp .env.example .env   # set VITE_API_URL if needed
npm install
npm run dev
```

Open the client at `http://localhost:5173`.

## API Endpoints

Base URL: `http://localhost:5000/api`

Auth

- `POST /auth/register` — register { name, email, password }
- `POST /auth/login` — login { email, password }
- `GET /auth/me` — get current user (protected)

Posts

- `GET /posts` — list posts (supports `?page=1&limit=10&category=<id>`)
- `GET /posts/:id` — single post
- `POST /posts` — create post (protected, FormData)
- `PUT /posts/:id` — update post (protected)
- `DELETE /posts/:id` — delete post (protected)

Categories

- `GET /categories` — list categories
- `POST /categories` — create category (protected)

## Seeding

- `npm run seed` — ensure default categories exist
- Assignment Checklist (Week4)
- Task 1 — Project setup: implemented
- Task 2 — Back-end API: implemented
- Task 3 — Front-end: implemented
- Task 4 — Integration: implemented (some UX improvements possible)
- Task 5 — Advanced features: partially implemented (authentication, uploads, pagination done; comments UI optional)

## Notes & Troubleshooting

- Ensure `ALLOWED_ORIGIN` in `server/.env` matches client origin to avoid CORS errors (e.g. `http://localhost:5173`).

## Project File Structure

Top-level layout and what each folder/file represents:

```
mern-stack-integration-Nomize/
├─ client/                    # React front-end (Vite)
│  ├─ public/                 # Static assets (index.html, icons)
│  ├─ src/
│  │  ├─ assets/              # Images and static client assets
│  │  ├─ components/          # Small reusable UI components (Navbar, Footer, PostCard, Loader)
│  │  ├─ context/             # React Context providers (Auth)
│  │  ├─ hooks/               # Custom hooks (useApi)
│  │  ├─ pages/               # Page components (Home, PostForm, Dashboard, SinglePost, About, Contact)
│  │  ├─ services/            # API service wrappers using axios (postService, categoryService, authService)
│  │  ├─ main.jsx             # App bootstrap and router
│  │  └─ App.jsx              # Route definitions and top-level layout
│  └─ package.json
├─ server/                    # Express back-end
│  ├─ config/                 # DB connection helpers (db.js)
│  ├─ controllers/            # Route handlers for posts, categories, auth
│  ├─ models/                 # Mongoose models (User, Post, Category)
│  ├─ routes/                 # Express routers
│  ├─ middleware/             # Auth, upload, and error handling middleware
│  ├─ scripts/                # Utility scripts (seedCategories, seedPosts, fixIndexes, resetPassword)
│  ├─ uploads/                # Uploaded files (images) served at `/uploads`
│  ├─ server.js               # Express app + route mounting
│  └─ package.json
└─ README.md
```

### Notable files

- `server/.env.example` and `client/.env.example`: templates for environment variables
- `server/scripts/seedCategories.js`: creates default categories used in the app
- `server/scripts/seedPosts.js`: optional example posts for testing (can be omitted in production)
- `client/src/services/api.js`: central axios instance and API wrappers (normalizes backend responses)
- `client/src/pages/PostForm.jsx`: create/edit UI for posts; supports image upload and category creation

## Further improvements (suggestions)

- Add a confirmation modal for deletes in the UI to avoid accidental deletions.
- Implement optimistic UI updates for create/update/delete to improve responsiveness.
- Add a search input on the Home page that uses `postService.searchPosts`.
- Implement a comments UI under `SinglePost` (backend already supports comments).
- Add tests (Jest + React Testing Library) for critical components and API mocks.
- Add `.env.example` for any CI or deployment steps and document any production build steps.

## Deployment Requirements

To deploy/run the application you need to provide the following environment variables and ensure the API is reachable from your client origin.

- Required server env vars (set these in `server/.env` or your host's config):

  - `MONGODB_URI` — MongoDB connection string (Atlas recommended for production)
  - `JWT_SECRET` — secret used to sign JWTs
  - `ALLOWED_ORIGIN` — the client origin (e.g. `https://your-front-end.example`)
  - `PORT` — optional (defaults to `5000`)
- Required client env vars (set in `client/.env` or host settings):

  - `VITE_API_URL` — base API URL (e.g. `https://your-backend.example/api`)

API endpoints your deployment must expose (base URL: `<VITE_API_URL>`):

- Auth

  - `POST /auth/register` — register { name, email, password }
  - `POST /auth/login` — login { email, password }
  - `GET /auth/me` — get current user (protected)
- Posts

  - `GET /posts` — list posts (supports `?page=1&limit=10&category=<id>`)
  - `GET /posts/:id` — single post
  - `POST /posts` — create post (protected, FormData)
  - `PUT /posts/:id` — update post (protected)
  - `DELETE /posts/:id` — delete post (protected)
- Categories

  - `GET /categories` — list categories
  - `POST /categories` — create category (protected)

With these env vars and endpoints available, the client can be pointed at the deployed API using `VITE_API_URL` and the blog will function as expected.
