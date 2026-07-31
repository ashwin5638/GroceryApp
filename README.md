# Grocery App (BulkRoots)

A full-stack online grocery ordering application built with a React frontend and a Node.js/Express backend backed by MongoDB.

- Frontend: https://grocery-app-xi-silk.vercel.app
- Backend API: https://groceryapp-3db5.onrender.com

---

## Tech Stack

### Frontend
- React 19
- Vite 6
- Tailwind CSS v4
- React Router 
- Axios
- react-icons

### Backend
- Node.js
- Express 
- MongoDB (Atlas)
- Mongoose
- JSON Web Tokens (JWT) + bcrypt for authentication
- CORS

---

## Features

### User Side
- Browse grocery products
- Product detail view
- Search and filter products
- Shopping cart with quantity management
- Checkout flow (mock payment)
- User registration and login (JWT-based)
- Protected routes
- Fully responsive UI

### Backend
- RESTful APIs for authentication, products, and cart
- JWT middleware for protected endpoints
- MongoDB data persistence via Mongoose

---

## Project Structure

```
GroceryApp-v2/
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/          # Axios client + API calls (auth, cart)
│       ├── assets/       # Images
│       ├── components/   # Reusable UI components
│       ├── context/      # Auth & Cart contexts
│       ├── hooks/        # useAuth, useCart, useForm, useProducts
│       ├── layouts/      # AuthLayout, MainLayout, Navbar, Footer
│       ├── lib/          # Constants & utilities
│       ├── pages/        # Home, Product, Cart, Checkout, Login, Register...
│       ├── routes/       # App routes
│       ├── App.jsx
│       ├── index.jsx
│       └── index.css
└── backend/
    ├── config/           # DB connection
    ├── controllers/      # Auth, product, cart controllers
    ├── middleware/       # JWT auth
    ├── model/            # Mongoose models (user, product, cart)
    ├── routes/           # Auth, product, cart routes
    ├── index.js          # Express app entry point
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas cluster (or local MongoDB)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5000
JWT_SECRET=your_jwt_secret
ATLAS_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Grocery?retryWrites=true&w=majority
```

Run the server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Scripts

### Frontend (`frontend/`)
| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Start Vite dev server      |
| `npm run build`  | Production build           |
| `npm run preview`| Preview the build          |
| `npm run lint`   | Run ESLint                 |
| `npm run format` | Format with Prettier       |

### Backend (`backend/`)
| Command          | Description           |
| ---------------- | --------------------- |
| `npm run dev`    | Start with nodemon    |
| `npm start`      | Start the server      |

---

## API Endpoints

Base URL: `http://localhost:5000` (or the deployed URL)

### Auth
| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login a user        |

### Products
| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/products`       | Get all products     |
| GET    | `/api/products/:id`   | Get a product by ID  |
| POST   | `/api/products`       | Add a product        |
| PUT    | `/api/products/:id`   | Update a product     |
| DELETE | `/api/products/:id`   | Delete a product     |

### Cart (requires JWT `Authorization: Bearer <token>`)
| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/api/cart`   | Get user's cart     |
| POST   | `/api/cart`   | Save cart items     |
| DELETE | `/api/cart`   | Clear cart          |

---

## Deployment

### Frontend (Vercel)
1. Import the repo on Vercel.
2. Set the root directory to `frontend`.
3. Add the environment variable `VITE_API_URL` pointing to the deployed backend.
4. Deploy (build command: `npm run build`, output directory: `dist`).

### Backend (Render)
1. Create a new Web Service connected to the repo.
2. Set the root directory to `backend`.
3. Add the environment variables `PORT`, `JWT_SECRET`, and `ATLAS_URI`.
4. Start command: `npm start`.

### CORS
The backend allows requests from `http://localhost:3000`, `http://localhost:5173`, and the deployed Vercel frontend. If you deploy the frontend to a different URL, add it to the `origin` list in `backend/index.js`.
