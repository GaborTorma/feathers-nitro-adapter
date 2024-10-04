# feathers-nitro-adapter

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![code style][code-style-src]][code-style-href]

Nitro adapter plugin for FeathersJS API

[🏀 Online playground](https://stackblitz.com/github/gabortorma/feathers-nitro-adapter?file=playground%2Fapp.vue)

## Install

```bash
pnpm install -D @gabortorma/feathers-nitro-adapter
```

## Usage in Nuxt v3

Create a new nitro plugin file in `server/plugins` folder:

### Express adapter example:

```ts
// server/plugins/feathers-express.ts
import { createFeathersExpressAdapterNitroPlugin } from '@gabortorma/feathers-nitro-adapter'
import { app } from 'feathers-api/src/app' // import your feathers app from workspace

export default createFeathersExpressAdapterNitroPlugin(app)
```

See [Express fixture](./test/fixtures/express/) in test cases.

### Koa adapter example:

```ts
// server/plugins/feathers-koa.ts
import { createFeathersKoaAdapterNitroPlugin } from '@gabortorma/feathers-nitro-adapter'
import { app } from 'feathers-api/src/app' // import your feathers app from workspace

export default createFeathersKoaAdapterNitroPlugin(app)
```

See [Koa fixture](./test/fixtures/koa/) in test cases.

### Socket.io adapter example:

```ts
// server/plugins/feathers-socket.io.ts
import { createFeathersSocketIoAdapterNitroPlugin } from '@gabortorma/feathers-nitro-adapter'
import { app } from 'feathers-api/src/app'

export default createFeathersSocketIoAdapterNitroPlugin(app)
```

See [Socket.io fixture](./test/fixtures/socket.io/) in test cases.

#### More example

You can check the [playground](./playground) folder for complex example with rest and socket.io transport and authentication.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@gabortorma/feathers-nitro-adapter/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@gabortorma/feathers-nitro-adapter
[npm-downloads-src]: https://img.shields.io/npm/dm/@gabortorma/feathers-nitro-adapter.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@gabortorma/feathers-nitro-adapter
[license-src]: https://img.shields.io/npm/l/@gabortorma/feathers-nitro-adapter.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@gabortorma/feathers-nitro-adapter
[code-style-src]: https://antfu.me/badge-code-style.svg
[code-style-href]: https://github.com/gabortorma/antfu-eslint-config
