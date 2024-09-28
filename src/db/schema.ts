import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const profile = pgTable('profile', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    name: text('name').notNull(),
    avatarUrl: text('avatar_url'),
    role: text('role').notNull(),
    roleEn: text('role_en').notNull(),
    bio: text('bio').notNull(),
    bioEn: text('bio_en').notNull(),
    goals: text('goals').notNull(),
    goalsEn: text('goals_en').notNull(),
    linkedIn: text('linkedin').notNull(),
    github: text('github').notNull(),
})

export const extraInfo = pgTable('extra_info', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    name: text('name').notNull(),
    nameEn: text('name_en').notNull(),
    content: text('content').notNull(),
    icon: varchar('icon', {length: 15}).notNull()
})

export const carrer = pgTable('carrer', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    title: text('title').notNull(),
    titleEn: text('title_en').notNull(),
    institution: text('institution').notNull(),
    description: text('description').notNull(),
    descriptionEn: text('description_en').notNull(),
    startDate: timestamp('start_date', {withTimezone: true}).notNull(),
    endDate: timestamp('end_date', {withTimezone: true}),
    icon: varchar('icon', {length: 15}).notNull(),
    carrerSection: varchar('carrer_section', {enum: ['job','education']}).notNull(),
})

export const tech = pgTable('tech', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    title: text('title').notNull(),
    titleEn: text('title_en').notNull(),
    description: text('description').notNull(),
    descriptionEn: text('description_en').notNull(),
    icon: varchar('icon', {length: 25}).notNull()
})

//N-M relations (TEST)

export const project = pgTable('project', {
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    profileId: text('profile_id').references(() => profile.id), //FK
    type: varchar('type', {enum: ['front-end', 'back-end', 'mobile', 'extras']}).notNull(),
    description: text('description').notNull(),
    descriptionEn: text('description_en').notNull(),
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
    title: text('title').notNull(),
    titleEn: text('title_en').notNull(),
    url: text('url').notNull(),
    img: text('img'),
    issuedAt: timestamp('issued_at', {withTimezone: true}),
    category: varchar('category', {enum: ['desenvolvimento de software', 'idiomas', 'variados']})
})

export const certificateTech = pgTable('certificate_tech', { //Certificate/Tech auxiliary table
    id: text('id').primaryKey().$defaultFn(() => createId()), //PK
    techId: text('tech_id').references(() => tech.id),
    certificateId: text('certificate_id').references(() => certificate.credentials),
}) 