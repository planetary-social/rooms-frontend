# planetary-rooms-frontend

This template should help get you started developing with Vue 3 in Vite.

## Development

Compile and Hot-Reload for Development
```sh
npm install
npm run dev
```

Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```

## Deployment

### Production

```
npm run build:production
```

- Creates a production build in `dist/`
- To add to the `go-ssb-room` repo:
  - Copy the `index.html` and all `assets` from the `dist/` folder to `go-ssb-room/web/assets`

### Staging

```sh
npm run build:staging
```

- Creates a build in `dist/`
- Deploys the app on github pages: `https://planetary-social.github.io/rooms-frontend`

Known issues:
- App reloading doesnt work on github pages.

---

(from default README)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

