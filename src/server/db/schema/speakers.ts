import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type * as z from "zod";
import { events } from "./events";

export const speakers = pgTable(
  "speakers",
  {
    id: serial("id").primaryKey(),
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
  },
  (t) => ({
    uniqueSpeaker: unique().on(t.firstName, t.lastName),
  }),
);

export type NewSpeaker = typeof speakers.$inferInsert;
export type Speaker = typeof speakers.$inferSelect;
export const insertSpeakerSchema = createInsertSchema(speakers);
export type InsertSpeakerSchema = z.infer<typeof insertSpeakerSchema>;

export const speakerRelations = relations(speakers, ({ many }) => ({
  event: many(speakersToEvents),
}));

export const speakersToEvents = pgTable(
  "speakers_to_events",
  {
    eventId: serial("event_id").references(() => events.id, {
      onDelete: "cascade",
    }),
    speakerId: serial("speaker_id").references(() => speakers.id, {
      onDelete: "cascade",
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.speakerId] }),
  }),
);

export const speakersToEventsRelations = relations(
  speakersToEvents,
  ({ one }) => ({
    event: one(events, {
      fields: [speakersToEvents.eventId],
      references: [events.id],
    }),
    speaker: one(speakers, {
      fields: [speakersToEvents.speakerId],
      references: [speakers.id],
    }),
  }),
);
