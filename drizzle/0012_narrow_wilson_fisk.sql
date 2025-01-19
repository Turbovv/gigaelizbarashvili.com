ALTER TABLE "portfolio_comment" ALTER COLUMN "created_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_user" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "portfolio_user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_comment" ADD COLUMN "created_by_name" varchar(255);--> statement-breakpoint
ALTER TABLE "portfolio_user" ADD CONSTRAINT "portfolio_user_name_unique" UNIQUE("name");