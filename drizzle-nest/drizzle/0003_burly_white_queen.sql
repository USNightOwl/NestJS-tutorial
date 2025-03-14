CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"authorId" integer NOT NULL,
	"postId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usersToGroups" (
	"userId" integer,
	"groupId" integer,
	CONSTRAINT "usersToGroups_groupId_userId_pk" PRIMARY KEY("groupId","userId")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToGroups" ADD CONSTRAINT "usersToGroups_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToGroups" ADD CONSTRAINT "usersToGroups_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;