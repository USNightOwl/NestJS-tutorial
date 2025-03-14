import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { posts } from './posts.schema';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  authorId: integer('authorId')
    .references(() => users.id)
    .notNull(),
  postId: integer('postId')
    .references(() => posts.id)
    .notNull(),
});
