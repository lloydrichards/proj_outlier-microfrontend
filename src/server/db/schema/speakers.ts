import { relations, sql } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type * as z from "zod";
import { events } from "./events";

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  eventId: serial("event_id").references(() => events.id, {
    onDelete: "cascade",
  }),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  title: varchar("title"),
  pronouns: varchar("pronouns"),
  email: varchar("email"),
  organization: varchar("organization"),
  imageUrl: varchar("image_url"),
  bio: varchar("bio"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export type NewSpeaker = typeof speakers.$inferInsert;
export type Speaker = typeof speakers.$inferSelect;
export const insertSpeakerSchema = createInsertSchema(speakers);
export type InsertSpeakerSchema = z.infer<typeof insertSpeakerSchema>;

export const speakerRelations = relations(speakers, ({ one }) => ({
  event: one(events, {
    fields: [speakers.eventId],
    references: [events.id],
  }),
}));
