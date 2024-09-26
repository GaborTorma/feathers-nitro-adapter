import type { Db } from 'mongodb'
import type { Application } from './declarations'
// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { MongoClient } from 'mongodb'

declare module './declarations' {
  interface Configuration {
    mongodbClient: Promise<Db>
  }
}

export function mongodb(app: Application) {
  const connection = app.get('mongodb') as string
  const database = new URL(connection).pathname.substring(1)
  const mongoClient = MongoClient.connect(connection).then(client => client.db(database))

  app.set('mongodbClient', mongoClient)
}
