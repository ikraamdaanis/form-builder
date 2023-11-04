CREATE TABLE IF NOT EXISTS "formSumissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "formSumissions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) DEFAULT 'default_name' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"description" text,
	"content" text DEFAULT '[]',
	"visits" integer DEFAULT 0 NOT NULL,
	"share_url" uuid DEFAULT gen_random_uuid() NOT NULL,
	"submissions" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "forms_id_unique" UNIQUE("id")
);
