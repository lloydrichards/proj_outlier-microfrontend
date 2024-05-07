DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "status" "status" DEFAULT 'PENDING' NOT NULL;