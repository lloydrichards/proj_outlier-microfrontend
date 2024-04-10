DO $$ BEGIN
 CREATE TYPE "block" AS ENUM('SPEAKER', 'LIGHTENING', 'PAUSE', 'ANNOUNCEMENT', 'UNCONF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('ACADEMIA', 'ACCESSIBILITY', 'CAREER', 'DASHBOARD', 'ANALYTICS', 'ART', 'SCIENCE', 'LITERACY', 'DEMO', 'DESIGN', 'HISTORICAL', 'JOURNALISM', 'MAPS', 'PROCESS', 'PROGRAMMING', 'PROJECT', 'RESEARCH', 'SOCIAL', 'SPORTS', 'STORYTELLING', 'THEORY', 'TOOLING', 'INDUSTRY', 'UNCERTAINTY', 'UNUSUAL', 'OTHER', 'KEYNOTE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "location" AS ENUM('UNASSIGNED', 'ROOM1', 'ROOM2', 'ROOM3', 'ROOM4', 'VIRTUAL', 'MAIN', 'ZOOM', 'SLACK');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "block" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "blocks_start_unique" UNIQUE("start")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speakers" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" serial NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"title" varchar,
	"pronouns" varchar,
	"email" varchar,
	"organization" varchar,
	"bio" varchar,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "post" RENAME TO "events";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "block_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "title" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description" varchar;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" "location" DEFAULT 'UNASSIGNED' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "link_url" varchar;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "link_label" varchar;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "category" "category" DEFAULT 'OTHER' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "start_idx" ON "blocks" ("start");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_block_id_blocks_id_fk" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speakers" ADD CONSTRAINT "speakers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
