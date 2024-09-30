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

## Usage in Nuxt v3

Create a new nitro plugin file in `server/plugins` folder:

### Express adapter example:

```ts
// server/plugins/feathers-express.ts
import { createFeathersExpressAdapterNitroPlugin } from '@gabortorma/feathers-nitro-adapter'
import { app, express } from 'feathers-api/src/app' // import your feathers app from workspace

export default createFeathersExpressAdapterNitroPlugin(app, express)
```

You need to create a own express server in your `feathers-api/src/app.ts`:

```ts
import feathersExpress from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers'
import _express from 'express'

export const express = _express()

export const app: Application = feathersExpress(feathers(), express)
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
import { app, engine } from 'feathers-api/src/app'

export default createFeathersSocketIoAdapterNitroPlugin(app, engine)
```

You need to create a own engine server in your `feathers-api/src/app.ts`:

```ts
import type { Application } from './declarations'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'
import { Server as Engine } from 'engine.io'

export const app: Application = feathers()

export const engine = new Engine()

app.configure(
  socketio({
    transports: ['websocket'],
  }, (io) => {
    io.bind(engine) // You need to bind the engine server
  }),
)
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
