ALTER TYPE "category" ADD VALUE 'DVS';--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "image_url" varchar;--> statement-breakpoint
ALTER TABLE "speakers" ADD COLUMN "image_url" varchar;