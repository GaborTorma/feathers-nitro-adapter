# feathers-nitro-adapter

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![code style][code-style-src]][code-style-href]

Nitro adapter plugin for FeathersJS API

[🏀 Online playground](https://stackblitz.com/github/gabortorma/feathers-nitro-adapter?file=playground%2Fapp.vue)

## Install

```bash
pnpm install add -D @gabortorma/feathers-nitro-adapter
```

## Usage

### Nuxt

Add the plugin to your `nuxt.config.js`:

```ts
export default defineNuxtConfig({
  nitro: {
    plugins: ['@gabortorma/feathers-nitro-adapter']
  }
})
```

### Nitro

Add the plugin to your `nitro.config.js`:

```ts
export default defineNitroConfig({
  plugins: ['@gabortorma/feathers-nitro-adapter']
})
```

## Release

Add your `GITHUB_TOKEN` to `.env` file or use web based login:

```bash
GITHUB_TOKEN=your_token
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@gabortorma/feathers-nitro-adapter/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@gabortorma/feathers-nitro-adapter
[npm-downloads-src]: https://img.shields.io/npm/dm/@gabortorma/feathers-nitro-adapter.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@gabortorma/feathers-nitro-adapter
[license-src]: https://img.shields.io/npm/l/@gabortorma/feathers-nitro-adapter.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@gabortorma/feathers-nitro-adapter
[code-style-src]: https://antfu.me/badge-code-style.svg
[code-style-href]: https://github.com/gabortorma/antfu-eslint-config
