// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html

import type { Application as FeathersExpressApplication } from '@feathersjs/express'
import type { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers'
import type { Application as FeathersKoaApplication } from '@feathersjs/koa'
import type { ApplicationConfiguration } from './configuration'
import type { User } from './services/users/users'

export type { NextFunction }

// The types for app.get(name) and app.set(name)
export interface Configuration extends ApplicationConfiguration {}

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type ExpressApplication = FeathersExpressApplication<ServiceTypes, Configuration>
export type KoaApplication = FeathersKoaApplication<ServiceTypes, Configuration>

// Select current adapter
export type Application = KoaApplication

// The context for hook functions - can be typed with a service class
export type HookContext<S = any> = FeathersHookContext<ExpressApplication | KoaApplication, S>

// Add the users as an optional property to all params
declare module '@feathersjs/feathers' {
  interface Params {
    user?: User
  }
}
