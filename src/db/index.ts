import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export const client = postgres('postgresql://neondb_owner:NG8bDOsR4wFx@ep-dawn-hill-a5lrgdd8.us-east-2.aws.neon.tech/neondb?sslmode=require')
export const db = drizzle(client, {schema, logger: true})