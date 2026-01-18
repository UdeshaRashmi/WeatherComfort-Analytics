# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Auth0 integration (Frontend)

Add these environment variables to a `.env` file at the project root (Vite uses `VITE_` prefix; code accepts either):

- `VITE_AUTH0_DOMAIN` or `REACT_APP_AUTH0_DOMAIN`
- `VITE_AUTH0_CLIENT_ID` or `REACT_APP_AUTH0_CLIENT_ID`
- `VITE_AUTH0_AUDIENCE` or `REACT_APP_AUTH0_AUDIENCE`

Example `.env` (do not commit):

```
VITE_AUTH0_DOMAIN=your-domain.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
```

Install and run:

```bash
npm install
npm run dev
```

Features added by this project:
- Protected dashboard that fetches data from the backend using Auth0 JWTs.
- Responsive desktop table and mobile cards showing rank, city, comfort score, temp and humidity.
- Cache status debug button to verify backend cache endpoint.

Comfort Index (brief):

Comfort Score = weighted combination of temperature and humidity factors (backend calculates the exact formula).

Cache design: 5-minute TTL; backend returns HIT/MISS status via `/api/cache/status`.

Auth flow: frontend obtains Auth0 access token and includes `Authorization: Bearer <token>` when calling backend APIs.

Limitations:
- Basic error handling in the UI.
- Cities list is static on the backend.
- API rate limits depend on upstream provider.
You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
