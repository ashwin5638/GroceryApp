# BulkRoots Client

React + Vite + Tailwind CSS v4 frontend for the BulkRoots grocery app.

## Available Scripts

### `npm run dev`

Starts the Vite dev server at [http://localhost:5172](http://localhost:5172) (the page opens automatically).

### `npm run build`

Builds the app for production to the `dist/` folder.

### `npm run preview`

Serves the production build locally.

### `npm run lint`

Runs ESLint.

### `npm run format`

Formats the source with Prettier.

## Environment

Create a `.env` file (see `.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

The value must include `/api`, because every path in `src/api/` is appended to it.

## Learn More

- [Vite documentation](https://vitejs.dev/guide/)
- [React documentation](https://react.dev/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
