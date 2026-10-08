# BulkRoots — UI/UX Design & Component Reference

Complete documentation of the UI/UX design system, reusable components, and Tailwind CSS usage for the **BulkRoots** grocery app (frontend).

---

## 1. App Overview

- **App name:** BulkRoots — fresh produce (vegetables, fruits, herbs) bulk grocery store.
- **Stack:** React 19 + Vite 6, `motion` (Framer Motion) `^13.2.0`, `react-icons` `^5.5.0`, `react-router-dom` `^7.5.1`, axios.
- **Styling:** Tailwind CSS **v4** (via `@tailwindcss/vite` plugin, CSS-first config using `@import "tailwindcss"` and `@theme`).
- **Alias:** `@` → `/src` (vite.config.js).
- **Design theme:** Fresh / green, organic grocery aesthetic. Primary color **green-600 (#16a34a)** across the whole app.
- **Currency:** Indian Rupee (`₹`), prices shown "per kg".

---

## 2. Tailwind CSS Setup

- **File:** `client/src/index.css` — single global stylesheet.
- **Plugin:** `@tailwindcss/vite` in `vite.config.js:3`.
- **Imported with:** `@import "tailwindcss";` (`index.css:1`).
- **No `tailwind.config.js`** — Tailwind v4 CSS-first configuration via `@theme`.

---

## 3. Design Tokens

### 3.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `green-600` | `#16a34a` | Primary brand color — buttons, badges, links, highlights |
| `green-500` | `#22c55e` | Focus rings, gradients, accents |
| `emerald-500/600` | `#10b981` / `#059669` | Gradient companion to green |
| `green-700` | `#15803d` | Heading text, price color, gradient start |
| `gray-800` | `#1f2937` | Footer background, product name text |
| `gray-50` | `#f9fafb` | Lighter surfaces, fallback backgrounds |
| `red-600` | `#dc2626` | Danger/error states |
| `white` | `#ffffff` | Cards, buttons on gradient backgrounds |

**Gradient patterns (recurring):**
- Hero / category headers: `bg-gradient-to-br from-green-700 via-green-600 to-emerald-500`
- Buttons: `bg-gradient-to-r from-green-600 to-emerald-600` (also `from-green-500 to-green-700`)
- Auth background: `bg-gradient-to-br from-gray-300 to-green-500`
- Product image wells: `bg-gradient-to-br from-green-50 via-emerald-50 to-green-100`

### 3.2 Radius, Spacing & Shape

- Buttons & cards: `rounded-lg` / `rounded-xl` / `rounded-2xl`
- Badges & pills: `rounded-full`
- AI chat bubbles: `rounded-2xl` with one corner flattened (`rounded-bl-none`, `rounded-tl-none`)
- Card shadow base: `shadow-md`, hover: `shadow-xl`, custom product shadow `shadow-[0_4px_18px_rgba(0,0,0,0.08)]`
- Green glow shadows: `shadow-[0_18px_40px_-12px_rgba(22,163,74,0.45)]`, `shadow-green-600/30`, `shadow-green-600/40`

### 3.3 Typography

- Weights: `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`.
- H1 hero: `text-5xl font-bold` (mobile `text-2xl`).
- Section titles: `text-2xl font-bold text-gray-800`.
- Page headers: `text-3xl font-extrabold text-white`.
- Product name: `text-lg font-bold text-gray-800`.
- Price: `text-green-700 font-extrabold`.
- Small utility text: `text-[10px]`, `text-[11px]`, `text-xs`, `text-sm` with `uppercase tracking-wider/widest` for badges.

---

## 4. Custom Tailwind Theme & Animations (`index.css`)

Defined inside `@theme { ... }` (Tailwind v4 syntax) — all exposed as utility classes like `animate-fade-in`.

| Utility | Description |
|---|---|
| `animate-fade-in` | `fade-in 0.5s ease-out both` — opacity fade |
| `animate-fade-up` | `fade-up 0.6s cubic-bezier(0.16,1,0.3,1)` — 24px rise + fade |
| `animate-scale-in` | `scale-in 0.45s` — scale 0.9 → 1 |
| `animate-pop` | `pop 0.35s` with overshoot `cubic-bezier(0.34,1.56,0.64,1)` — scale 0.6 → 1.08 → 1 |
| `animate-float` | `float 6s infinite` — gentle ±10px vertical bob (used on hero emojis, badges) |
| `animate-glow` | `glow 2.6s infinite` — expanding green box-shadow ring |
| `animate-shimmer` | `shimmer 2.4s linear infinite` — sweep highlight effect |
| `animate-gradient-x` | `gradient-x 6s ease infinite` — animated gradient position |
| `animate-spin-slow` | `spin 14s linear infinite` |
| `animate-bounce-soft` | `bounce-soft 2s infinite` — 4px bounce |
| `animate-typing` | `typing 1.2s infinite` — typing indicator dots (3-dot bounce) |

### Custom delay utilities
`.animate-delay-100` → `.animate-delay-500` (`index.css:147-161`) — staggers animations.

---

## 5. Custom CSS Utilities (`index.css`)

| Class | Purpose |
|---|---|
| `.bg-shift` | Animated background gradient (green tones) with `background-size: 200% 200%` — used with `animate-gradient-x` visual effect |
| `.text-gradient` | Green gradient clipped to text: `linear-gradient(90deg,#16a34a,#10b981)`, transparent fill |
| `.shine-btn` | Sheen sweep on hover — white diagonal highlight (`::after` with `skewX(-20deg)`, slides `-150% → 150%` on hover). Applied to many CTAs. |

### Global styles
- `html { scroll-behavior: smooth }` and `body { overflow-x: hidden }`.
- Custom scrollbar: 8px, transparent track, rounded green thumb (`rgba(22,163,74,0.35)` → `0.6` on hover).

---

## 6. Motion (Framer Motion) Patterns

Consistent easing curve: `ease: [0.16, 1, 0.3, 1]` (expo-out).

| Pattern | Usage |
|---|---|
| Page enter | `PageTransition` — `opacity + y:14 → 0`, 0.4s |
| Scroll reveal | `Reveal` / `whileInView` with `viewport={{ once: true, margin: '-40px' }}` |
| Card hover | `whileHover={{ y: -6/ -8/ -10, scale: 1.02 }}` with spring `{ stiffness: 300, damping: 22 }` |
| Tap feedback | `whileTap={{ scale: 0.75–0.97 }}` on all interactive elements |
| Press/entrance pop | `pop` animation / `initial={scale:0} animate={scale:1}` with spring `{stiffness: 320-500, damping: 15-26}` |
| List add (cart icon) | `AnimatePresence mode="wait"` swap cart ↔ check icon, spring scale+rotate |
| Hero content | staggered `fadeUp(delay)` helper (0.05 → 0.35) |
| Category cards | `whileInView` 1.1s entrance, staggered `delay = i * 0.08` |
| Floating hero image | infinite `y: [0, -10, 0]` 5s loop |
| AI typing indicator | 3 dots, `animate-typing`, stagger `0.18s` |
| FAB (AI button) | `animate-ping` halo ring + rotating sparkle `rotate: [0,-10,10,0]` |

---

## 7. UI Components (`src/components/ui`)

### 7.1 `Button.jsx`
Framer-motion button with variants and sizes.

| Prop | Values |
|---|---|
| `variant` | `primary` (green-600 / hover green-700), `secondary` (gray-200 / gray-300), `danger` (red-600 / red-700), `ghost` (transparent / gray-100) |
| `size` | `sm` px-3 py-1.5 text-sm, `md` px-5 py-2.5 text-base, `lg` px-7 py-3 text-lg |
| `loading` | Renders `<Spinner className="-ml-1 mr-2" />` |

Base classes: `inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50`, `whileTap={{ scale: 0.96 }}`.

### 7.2 `Card.jsx`
White card: `bg-white rounded-xl shadow-md`, hover `hover:shadow-xl` + `whileHover={{ y: -6, scale: 1.02 }}` (spring `300/22`). `hover={false}` disables lift.

### 7.3 `Input.jsx`
Form input with label + error.

- Base: `w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2`
- No error: `border-gray-300 focus:ring-green-500 focus:border-green-500`
- Errors: `border-red-500` + red focus; error message `text-xs text-red-600`
- Layout wrapper: `flex flex-col gap-1`; label `text-sm font-medium text-gray-700`

### 7.4 `Spinner.jsx`
`inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin`, `role="status" aria-label="Loading"`.

### 7.5 `ProductList.jsx` (product card, catalog grid)
Fixed-height card: `h-[290px] w-[260px]` (`max-md:w-[200px]`), `bg-white rounded-2xl`, shadow `0_4px_18px_rgba(0,0,0,0.08)`, hover `0_18px_40px_-12px_rgba(22,163,74,0.45)`.

- **Image well:** `h-[175px] bg-gradient-to-br from-green-50 via-emerald-50 to-green-100`, image `h-[140px] w-[150px] object-contain drop-shadow-md`, `group-hover:scale-110 group-hover:-rotate-1` zoom.
- **"Fresh" badge:** absolute, `text-[10px] font-bold uppercase tracking-wider bg-green-600/90 text-white rounded-full`.
- **Body:** name `text-lg font-bold text-gray-800`; price `text-green-700 font-extrabold` + `per kg` caption.
- **Add-to-cart FAB:** `h-9 w-9 rounded-full bg-green-600`, `whileTap 0.82`, icon swap cart↔check via `AnimatePresence`, plus "Added!" tooltip.
- **Entrance:** `initial {opacity:0,y:26,scale:0.96}` → in-view, staggered `(index % 6) * 0.06`.
- **Guard:** unauthenticated users → `/login?redirect=/product/:id`.

### 7.6 `ErrorBoundary.jsx`
Class component. Full-screen `min-h-screen bg-gray-50` fallback, `Something went wrong`, error message, `Reload Page` green button.

### 7.7 `ProtectedRoute.jsx`
Redirects unauthenticated users to `/login?redirect=<path>`.

### 7.8 `Reveal.jsx`
Scroll-reveal wrapper — `initial {opacity:0, y:24}` → while-in-view, `viewport={{ once, margin: '-40px' }}`, `0.55s` with optional `delay`, `y`, `once`, `className`.

### 7.9 `PageTransition.jsx`
Page enter — `{opacity:0, y:14}` → `{opacity:1, y:0}`, `0.4s` expo-out.

### 7.10 AI Components (`src/components/ui/AI`)

**`AIAssistant.jsx`** — floating chat widget, global (mounted in `App.jsx`).
- FAB: `fixed bottom-6 right-4`, `h-14 w-14 rounded-full bg-gradient-to-br from-green-600 to-emerald-600`, `shadow-green-600/40`, ping halo, spring enter/scale.
- Panel: `fixed bottom-24 right-4 h-[520px] w-[calc(100vw-2rem)] max-w-[380px] rounded-3xl border-green-100 bg-white`, big green drop shadow; spring `{stiffness:320, damping:26}`.
- Header: `bg-gradient-to-r from-green-700 via-green-600 to-emerald-500`, decorative blurred circles, robot avatar + green online dot (`animate-pulse`), sparkles (`animate-float`), close button.
- Body: `bg-gradient-to-b from-green-50/50 to-white`, auto-scrolls to bottom.
- Empty state: spring robot icon, greeting, 4 suggestion chips (white, `border-green-100`, hover `border-green-400 bg-green-50`).
- Typing indicator: 3 `w-2 h-2 bg-green-500 rounded-full animate-typing` dots.

**`AIInput.jsx`** — chat input bar: `border-t border-green-100`, textarea `rounded-2xl border-green-100 bg-green-50/50` focus `ring-green-200`, Enter-to-send (Shift+Enter = newline). Send button `w-11 h-11 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600`, shows rotating spinner while loading.

**`AiMessage.jsx`** — chat bubble, enter `{opacity:0,y:16,scale:0.95}`.
- User: `bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-tr-none`, right-aligned, person icon.
- Bot: `bg-white border-green-100 text-gray-800 rounded-tl-none`, robot avatar.
- Meta row: `text-[10px] font-bold uppercase tracking-wide` ("YOU" / "BULKROOTS AI").

---

## 8. Layouts (`src/layouts`)

### 8.1 `MainLayout.jsx`
`min-h-screen flex flex-col` → `<Navbar />` + `<main className="flex-1">` + `<Footer />`.

### 8.2 `Navbar.jsx`
Sticky-height bar: `h-20 flex items-center justify-between px-6 py-3 bg-white shadow-sm`.
- Brand: `text-2xl font-bold text-green-600`.
- Desktop links: `hidden md:flex`, `text-lg font-bold` (Home / Product / My Orders).
- Mobile hamburger `md:hidden` toggles HiMenu/HiX; animated dropdown `AnimatePresence` (`opacity/height/y` 0.28s) under the bar (`absolute top-20 w-full bg-white shadow-md`).
- Cart icon with animated count badge (`absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5`, spring pop on change `key={totalItems}`).
- Auth icon: CiLogout (auth) / GoPerson (anon).

### 8.3 `Footer.jsx`
`bg-gray-800 text-white px-5 py-10`. Grid `grid-cols-[repeat(auto-fit,minmax(220px,1fr))]`, `max-w-6xl mx-auto`. Columns: brand+about+social (f/t/i placeholders), Quick Links, Categories, Contact. Bottom bar `border-t border-gray-700`.

### 8.4 `AuthLayout.jsx`
`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-green-500 p-5`, inner card `bg-white rounded-2xl shadow-xl p-10 w-full max-w-md`.

---

## 9. Pages

### 9.1 `HomePage.jsx`
- **Hero:** `bg-gradient-to-br from-green-600 via-green-600 to-emerald-600`, floating emoji decorations (`animate-float`, white/20), headline `text-5xl font-bold text-white` with a wiggling 🌱, sub copy, and `shine-btn` white CTA `h-14 w-60 rounded` (mobile stacks).
- **Categories & Featured:** `Reveal`-section headers (`text-2xl font-bold text-gray-800`); `CategoryCard` = `h-52 w-72 rounded-xl bg-cover` with `bg-gradient-to-t from-black/50` overlay and white `text-2xl font-bold` name.
- **CTA band:** `bg-gradient-to-r from-green-700 via-green-600 to-emerald-600` + `bg-shift`, `h-96`, white headline/CTA with `shine-btn`.

### 9.2 `ProductPage.jsx` / `FruitPage.jsx` / `HerbsPage.jsx` (catalog)
- Background: `bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 min-h-screen`.
- Header: emoji (🥬/🍎/🌿) pop-in, `text-white text-3xl font-extrabold` title, count pill `text-white/80 bg-white/15 rounded-full px-3 py-1`.
- Grid: `flex flex-row flex-wrap justify-center gap-6` of `ProductList` cards.
- Data via `useProducts()`: `vegetables`, `fruits`, `herbs`, `all` from `src/data.json`.

### 9.3 `ProductDetailPage.jsx`
- Layout: `flex min-h-screen bg-gradient-to-br from-green-50/60 via-white to-emerald-50/60`.
- Image: `h-[400px] w-[500px] rounded-2xl bg-white/80 backdrop-blur` green soft-shadow, spring `{stiffness:120, damping:16}`, `object-contain drop-shadow-2xl`, floating "✦ In Stock" badge.
- Info: "ORGANIC PRODUCE" pill (`bg-emerald-50 text-emerald-600`), name `text-4xl font-extrabold`, price `₹X` in `text-green-700` + `/ kg`, description.
- **Qty stepper:** circular `w-9 h-9 border-2 border-green-200 rounded-full` − / + buttons (`whileTap 0.75`); read-only animated input `w-14 h-9` spring pop on change.
- **CTA:** `shine-btn bg-gradient-to-r from-green-600 to-emerald-600 text-white h-12 w-52 rounded-xl` with check icon → adds to cart, routes to `/cart`; unauthenticated → login redirect.
- **Trust badges:** Farm Fresh (FaLeaf) / Fast Delivery (FaTruck) / Quality Checked (FaShieldAlt) — `bg-white rounded-full border-green-100 shadow-sm`, `whileHover y:-4`.

### 9.4 `CartPage.jsx`
- Empty state: centered `text-2xl font-bold` + green "Continue Shopping" button.
- Layout: `flex max-md:flex-col gap-8 p-8 max-w-[1400px]`.
- **Items:** white `rounded-xl shadow-sm` rows (`whileInView` stagger `index*0.08`, exit slide `x:-80`), product image `h-48 w-60 object-contain`, qty stepper (`w-5 h-5 bg-green-600` buttons), line total `₹price×qty`, trash `CiTrash` (`hover:text-red-500`), plus "Clear Cart".
- **Order Summary:** sticky `w-[360px] bg-gradient-to-br from-gray-50 to-green-50 rounded-xl shadow-md p-9 sticky top-6`, Total pill `bg-green-600 rounded-lg`, two green ghost CTAs (hover inverts to white/green text), fine print `*Prices are inclusive of taxes...`.

### 9.5 `CheckoutPage.jsx`
- Shipping form on `bg-green-600 rounded-xl w-[830px]` panel — inputs `text-white border-green-300 rounded pl-5` (white text on green).
- Summary card `bg-white rounded-xl shadow-md w-[350px]`.
- **Steps** via `AnimatePresence mode="wait"`: form → payment → success.
- **Payment methods:** Credit/Debit, UPI, COD radios; selected row `border-green-600 bg-green-50`, `accent-green-600`. Conditional fields per method.
- **Success state:** spinning-in `FaCheckCircle` (`text-6xl text-green-600`), "Payment Successful", green `shine-btn` "Continue Shopping".

### 9.6 `LoginPage.jsx` / `RegisterPage.jsx`
- Wrapped in `AuthLayout`; forms `flex flex-col gap-5`.
- Alerts: error `bg-red-50 text-red-600`, success `bg-green-50 text-green-600`, both `p-2.5 rounded text-sm text-center`.
- Links blue (`text-blue-500 hover:underline`), terms checkbox, remember-me row.
- Uses `Button`/`Input` components, `useAuth` + `useForm` hooks.

---

## 10. Forms & Validation (`src/hooks`)

- `useForm.js`: values/errors/handleChange/handleBlur/validateAll.
- Validation: email regex, password ≥ 6 chars, required fields.
- Branding constant: `APP_NAME = 'BulkRoots'` (`src/lib/constants.js`).

---

## 11. Responsive Breakpoints

| Breakpoint | Pattern used |
|---|---|
| `max-md` (<768px) | Stack hero/product rows, shrink cards (`max-md:w-[200px]`), center content, `max-md:flex-col`, hide desktop nav |
| `md` (≥768px) | Show desktop nav links, reposition AI FAB (`sm:right-6`) |
| `sm` (≥640px) | Only used for AI widget right offset |

General approach: mobile-first layouts that become 2-column flexible grids (`flex flex-wrap justify-center gap-6`) on desktop; hero/catalog sections use `min-h-screen` green gradients.

---

## 12. Reusable Tailwind Class Recipes

```txt
Primary CTA     bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold
Gradient CTA    bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-green-600/30 + shine-btn
Page background bg-gradient-to-br from-green-700 via-green-600 to-emerald-500
Card            bg-white rounded-xl shadow-md hover:shadow-xl
Badge (Fresh)   bg-green-600/90 text-white text-[10px] uppercase tracking-wider rounded-full
Qty stepper     bg-white border-2 border-green-200 rounded-full w-9 h-9
Price           text-green-700 font-extrabold
```

---

## 13. Icons (`react-icons`)

| Set | Icons |
|---|---|
| `ci` | CiShoppingCart, CiCircleCheck, CiLogout, CiTrash |
| `go` | GoPerson, GoArrowRight |
| `hi` | HiMenu, HiX, HiSparkles, HiPaperAirplane |
| `fa` | FaRobot, FaCheck, FaLeaf, FaTruck, FaShieldAlt, FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaCheckCircle, FaArrowLeft |
| Emoji | 🍃 🥗 🌿 🌱 🥬 🍎 🌿 (UI markers/decorations) |