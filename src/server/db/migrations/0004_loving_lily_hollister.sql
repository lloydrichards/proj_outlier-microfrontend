ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "account_userId_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "session_userId_idx";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "provider" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "providerAccountId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "token_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "scope" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "session_state" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "sessionToken" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "identifier" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "token" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
