# planetary-rooms-frontend

The rooms frontend app is a vue app meant to be run with go-ssb-rooms and planetary-graphql. The three apps together let users find connections, build community, present their scuttlebutt (planetary) profile to the web, and accept inbound connections. 

Here are some screenshots of the app in development:
![Fgc9NvdVQAE7Xpn](https://user-images.githubusercontent.com/76/200228414-28113ac8-6fea-4f4d-8387-bcc0b9944ffa.jpeg)
![Fgc9NvgUAAAKu29](https://user-images.githubusercontent.com/76/200228424-12b7ef06-0cdd-4cf3-b860-598dfa747379.jpeg)
![Fgc9NvkVQAAFIyD](https://user-images.githubusercontent.com/76/200228429-9249d07e-2b08-4d8e-b05b-4aecd8decd09.jpeg)



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

