DO $$ BEGIN
 CREATE TYPE "block" AS ENUM('SPEAKER', 'LIGHTNING', 'PAUSE', 'ANNOUNCEMENT', 'NETWORKING', 'UNCONF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('ACADEMIA', 'ACCESSIBILITY', 'CAREER', 'DASHBOARD', 'ANALYTICS', 'ART', 'SCIENCE', 'LITERACY', 'DEMO', 'DESIGN', 'HISTORICAL', 'JOURNALISM', 'MAPS', 'PROCESS', 'PROGRAMMING', 'PROJECT', 'RESEARCH', 'SOCIAL', 'SPORTS', 'STORYTELLING', 'THEORY', 'TOOLING', 'INDUSTRY', 'UNCERTAINTY', 'UNUSUAL', 'OTHER', 'KEYNOTE', 'DVS');
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
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"edition" varchar DEFAULT date_part('year', CURRENT_DATE) NOT NULL,
	"type" "block" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "blocks_start_unique" UNIQUE("start")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"block_id" serial NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"summary" varchar,
	"location" "location" DEFAULT 'UNASSIGNED' NOT NULL,
	"image_url" varchar,
	"link_url" varchar,
	"link_label" varchar,
	"category" "category" DEFAULT 'OTHER' NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speakers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"title" varchar,
	"pronouns" varchar,
	"email" varchar,
	"organization" varchar,
	"image_url" varchar,
	"bio" varchar,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "speakers_first_name_last_name_unique" UNIQUE("first_name","last_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speakers_to_events" (
	"event_id" serial NOT NULL,
	"speaker_id" serial NOT NULL,
	CONSTRAINT "speakers_to_events_event_id_speaker_id_pk" PRIMARY KEY("event_id","speaker_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "start_idx" ON "blocks" ("start");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_block_id_blocks_id_fk" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speakers_to_events" ADD CONSTRAINT "speakers_to_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speakers_to_events" ADD CONSTRAINT "speakers_to_events_speaker_id_speakers_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "speakers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
