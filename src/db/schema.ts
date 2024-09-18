import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const profile = pgTable('profile', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    name: text('name').notNull(),
    role: text('role').notNull(),
    bio: text('bio').notNull(),
    goals: text('goals').notNull(),
    linkedIn: text('linkedin').notNull(),
    github: text('github').notNull(),
})

export const extraInfo = pgTable('extra_info', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    name: text('name').notNull(),
    content: text('content').notNull(),
    icon: varchar('icon', {length: 15}).notNull()
})

export const carrer = pgTable('carrer', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    title: text('title').notNull(),
    institution: text('institution').notNull(),
    description: text('description').notNull(),
    startDate: timestamp('start_date', {withTimezone: true}).notNull(),
    endDate: timestamp('end_date', {withTimezone: true}),
    icon: varchar('icon', {length: 15}).notNull(),
    carrerSection: varchar('carrer_section', {enum: ['job','education']}).notNull(),
})

export const tech = pgTable('tech', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    title: text('title').notNull(),
    description: text('description').notNull(),
    icon: varchar('icon', {length: 15}).notNull()
})

//N-M relations (TEST)

export const project = pgTable('project', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    type: varchar('type', {enum: ['front-end', 'back-end', 'mobile', 'extras']}).notNull(),
    description: text('description').notNull(),
    repoUrl: text('repo_url').notNull(),
    url: text('url').notNull(),
    img: text('img')
})

export const projectTech = pgTable('project_tech', { //Project/Tech auxiliary table
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    techId: text('tech_id').references(() => tech.id),
    projectId: text('project_id').references(() => project.id)
}) 

export const certificate = pgTable('certificate', {
    credentials: text('id').primaryKey().notNull(), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    url: text('url').notNull(),
    img: text('img')
})

export const certificateTech = pgTable('certificate_tech', { //Certificate/Tech auxiliary table
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    techId: text('tech_id').references(() => tech.id),
    certificateId: text('certificate_id').references(() => certificate.credentials)
}) 