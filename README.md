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
- OpenAI SDK (via OpenRouter)


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
- Browse products by category (Vegetables, Fruits, Herbs) from the live API
- Product detail view with description, price and stock
- Search and filter products
- Shopping cart with quantity management, synced to the server when logged in
- Guest cart that merges into the account cart on login
- Checkout flow (mock payment, no real gateway)
- User registration and login (JWT-based)
- AI Grocery Assistant: floating chat widget that recommends products from the live in-stock inventory

### Backend
- RESTful APIs for authentication, products, cart, and AI
- JWT middleware protecting cart, AI, and product-write endpoints
- MongoDB persistence via Mongoose
- One central error handler so every response has the same shape
- AI chat endpoint using OpenRouter with a single pinned model

Every response follows the same contract:

```jsonc
// success
{ "success": true, "message": "Cart saved", "cart": [] }

// failure
{ "success": false, "message": "Session expired, please log in again" }
```

---

## Project Structure

```
GroceryApp-v2/
├── client/
│   ├── public/
│   └── src/
│       ├── api/          # Axios client + API calls (auth, cart, products, ai)
│       ├── assets/       # Images
│       ├── components/   # Reusable UI components (incl. ui/AI chat widget)
│       ├── context/      # Auth, Cart & Products providers
│       ├── hooks/        # useAuth, useCart, useForm, useProducts
│       ├── layouts/      # AuthLayout, MainLayout, Navbar, Footer
│       ├── lib/          # Constants & utilities
│       ├── pages/        # Home, ProductList, ProductDetail, Cart, Checkout, NotFound...
│       ├── routes/       # App routes
│       ├── App.jsx
│       ├── index.jsx
│       └── index.css
└── server/
    ├── config/           # DB connection
    ├── controllers/      # Auth, product, cart, AI controllers
    ├── middleware/       # JWT auth + central error handler
    ├── model/            # Mongoose models (user, product, cart)
    ├── routes/           # Auth, product, cart, AI routes
    ├── services/         # AI response generation (OpenRouter)
    ├── seed.js           # Seed script for products
    ├── seed/             # Product catalogue JSON
    ├── index.js          # Express app entry point
    └── package.json
```

### How the frontend is wired

`App.jsx` nests three providers so each one can depend on the one above it:

```
AuthProvider      -> who is logged in, provides the JWT
  CartProvider    -> needs the token to sync the cart
    ProductsProvider -> fetches the catalogue once, shared by every page
```

Pages are loaded with `React.lazy`, so each route becomes its own small bundle
instead of one large JavaScript file.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas cluster (or local MongoDB)

### 1. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/` (see `server/.env.example`):

```
PORT=5000
JWT_SECRET=your_jwt_secret
ATLAS_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Grocery?retryWrites=true&w=majority
OPENROUTER_API_KEY=your_openrouter_api_key
CLIENT_URLS=http://localhost:5172
```

`CLIENT_URLS` is a comma-separated allowlist for CORS. It defaults to
`http://localhost:5172,http://localhost:5173` when unset.

Load the product catalogue (31 products) into MongoDB:

```bash
npm run seed
```

The script skips if products already exist. To replace the catalogue with the
current data:

```bash
npm run seed -- --fresh
```

Run the server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 2. Client Setup

```bash
cd client
npm install
```

Create a `.env` file in `client/` (see `client/.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

The value must include `/api`, because every path in `src/api/` is appended to
it (for example `products.js` calls `${API_URL}/products`).

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:5172`.

---

## Scripts

### Client (`client/`)
| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Start Vite dev server      |
| `npm run build`  | Production build           |
| `npm run preview`| Preview the build          |
| `npm run lint`   | Run ESLint                 |
| `npm run format` | Format with Prettier       |

### Server (`server/`)
| Command          | Description           |
| ---------------- | --------------------- |
| `npm run dev`    | Start with nodemon    |
| `npm start`      | Start the server      |
| `npm run seed`   | Seed products         |
| `npm run seed -- --fresh` | Wipe and re-seed products |

---

## API Endpoints

Base URL: `http://localhost:5000` (or the deployed URL)

### Auth
| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login a user        |

### Products
| Method | Endpoint              | Auth | Description          |
| ------ | --------------------- | ---- | -------------------- |
| GET    | `/api/products`       | No   | Get all products     |
| GET    | `/api/products/:id`   | No   | Get a product by ID  |
| POST   | `/api/products`       | Yes  | Add a product        |
| PUT    | `/api/products/:id`   | Yes  | Update a product     |
| DELETE | `/api/products/:id`   | Yes  | Delete a product     |

Browsing is public so the shop works before login; anything that writes requires a token.

### Cart (requires JWT `Authorization: Bearer <token>`)
| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/api/cart`   | Get user's cart                 |
| POST   | `/api/cart`   | Replace the cart with an array  |

There is no DELETE endpoint. Send `POST /api/cart` with `[]` to clear the cart,
which keeps the API to a single write path.

Each cart item is a snapshot of the product:

```json
{
  "product": "64b...",
  "name": "Apple",
  "image_url": "https://...",
  "price": 35,
  "quantity": 2
}
```

Storing the name, image and price alongside the product id means the cart still
renders correctly if a product is later renamed or repriced.

### AI Assistant (requires JWT)
| Method | Endpoint       | Description                                    |
| ------ | -------------- | ---------------------------------------------- |
| POST   | `/api/ai/chat` | Send `{ message }`; returns `{ response }`    |

The backend loads in-stock products, sends them to the model as a compact
inventory list, and instructs it to only recommend real products at real prices.

---

## Deployment

### Client (Vercel)
1. Import the repo on Vercel.
2. Set the root directory to `client`.
3. Add the environment variable `VITE_API_URL` pointing to the deployed backend.
4. Deploy (build command: `npm run build`, output directory: `dist`).

### Backend (Render)
1. Create a new Web Service connected to the repo.
2. Set the root directory to `server`.
3. Add the environment variables `PORT`, `JWT_SECRET`, `ATLAS_URI`, `OPENROUTER_API_KEY`, and `CLIENT_URLS` (your deployed frontend URL).
4. Start command: `npm start`.

### CORS
The backend allows requests from the origins in `CLIENT_URLS`, defaulting to
`http://localhost:5172,http://localhost:5173`. Add your deployed frontend URL to
that variable rather than editing `server/index.js`.

---

## Design Decisions

A few choices worth being able to explain:

- **One error handler.** `middleware/errorHandler.js` exports `ApiError`,
  `asyncHandler`, `notFound` and `errorHandler`. Controllers are one-liners and
  never repeat `try/catch`, and every client sees the same JSON shape.
- **No duplicated catalog data.** Products live only in MongoDB. The frontend
  fetches them once through `ProductsContext` instead of keeping a hardcoded
  `data.json` that drifts out of sync.
- **Cart is server-owned when logged in.** A guest cart is kept in
  `localStorage`, then merged into the account cart on login so nothing is lost.
- **Cart items are snapshots, not joins.** See the cart section above.
- **AI is grounded on real stock.** The model only ever sees in-stock products,
  and the system prompt forbids inventing products or prices.
- **Pinned AI model.** One constant, `AI_MODEL` in `services/aiService.js`,
  instead of a fallback chain. Easy to swap, easy to reason about.

## Interview Talking Points

If you are asked to explain this project, a short version is:

> It is a full-stack grocery store. The frontend is React with Vite and Tailwind,
> using Context API for auth, cart and product state. The backend is Express and
> MongoDB with JWT auth. Browsing is public, but cart, AI and product writes need
> a token. An AI assistant answers questions using only the live in-stock
> inventory, which keeps it from recommending things that do not exist.

Points you can expand on:
- Why a shared catalogue replaced a hardcoded frontend list.
- Why cart items store a snapshot instead of only a product id.
- How guest and logged-in carts are merged.
- How route-level code splitting and a single error handler keep the code simple.
- Where you would add real payments and order persistence next.
