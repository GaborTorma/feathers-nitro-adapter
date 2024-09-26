// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html
import type { Application as FeathersApplication } from '@feathersjs/express'
import type { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers'
import type { ApplicationConfiguration } from './configuration'

export type { NextFunction }

// The types for app.get(name) and app.set(name)
export interface Configuration extends ApplicationConfiguration {}

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes, Configuration>

// The context for hook functions - can be typed with a service class
export type HookContext<S = any> = FeathersHookContext<Application, S>
