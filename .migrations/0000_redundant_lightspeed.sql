CREATE TABLE IF NOT EXISTS "carrer" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_id" text,
	"title" text NOT NULL,
	"institution" text NOT NULL,
	"description" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"icon" varchar(15) NOT NULL,
	"carrer_section" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "certificate" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_id" text,
	"url" text NOT NULL,
	"img" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "certificate_tech" (
	"id" text PRIMARY KEY NOT NULL,
	"tech_id" text,
	"certificate_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "extra_info" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_id" text,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"icon" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"bio" text NOT NULL,
	"goals" text NOT NULL,
	"linkedin" text NOT NULL,
	"github" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_id" text,
	"type" varchar NOT NULL,
	"description" text NOT NULL,
	"repo_url" text NOT NULL,
	"url" text NOT NULL,
	"img" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_tech" (
	"id" text PRIMARY KEY NOT NULL,
	"tech_id" text,
	"project_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tech" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_id" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(15) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carrer" ADD CONSTRAINT "carrer_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certificate" ADD CONSTRAINT "certificate_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certificate_tech" ADD CONSTRAINT "certificate_tech_tech_id_tech_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certificate_tech" ADD CONSTRAINT "certificate_tech_certificate_id_certificate_id_fk" FOREIGN KEY ("certificate_id") REFERENCES "public"."certificate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "extra_info" ADD CONSTRAINT "extra_info_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tech" ADD CONSTRAINT "project_tech_tech_id_tech_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tech" ADD CONSTRAINT "project_tech_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tech" ADD CONSTRAINT "tech_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
