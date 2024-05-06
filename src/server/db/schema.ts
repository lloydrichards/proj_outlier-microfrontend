import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type * as z from "zod";

export const blockEnum = pgEnum("block", [
  "SPEAKER",
  "LIGHTENING",
  "PAUSE",
  "ANNOUNCEMENT",
  "NETWORKING",
  "UNCONF",
]);

export const categoryEnum = pgEnum("category", [
  "ACADEMIA",
  "ACCESSIBILITY",
  "CAREER",
  "DASHBOARD",
  "ANALYTICS",
  "ART",
  "SCIENCE",
  "LITERACY",
  "DEMO",
  "DESIGN",
  "HISTORICAL",
  "JOURNALISM",
  "MAPS",
  "PROCESS",
  "PROGRAMMING",
  "PROJECT",
  "RESEARCH",
  "SOCIAL",
  "SPORTS",
  "STORYTELLING",
  "THEORY",
  "TOOLING",
  "INDUSTRY",
  "UNCERTAINTY",
  "UNUSUAL",
  "OTHER",
  "KEYNOTE",
]);

export const locationEnum = pgEnum("location", [
  "UNASSIGNED",
  "ROOM1",
  "ROOM2",
  "ROOM3",
  "ROOM4",
  "VIRTUAL",
  "MAIN",
  "ZOOM",
  "SLACK",
]);

export const blocks = pgTable(
  "blocks",
  {
    id: serial("id").primaryKey(),
    type: blockEnum("type").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    start: timestamp("start").unique().notNull(),
    end: timestamp("end").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => ({
    startIndex: index("start_idx").on(table.start),
  }),
);

export type NewBlock = typeof blocks.$inferInsert;
export type Block = typeof blocks.$inferSelect;
export const insertBlockSchema = createInsertSchema(blocks);
export type InsertBlockSchema = z.infer<typeof insertBlockSchema>;

export const blockRelations = relations(blocks, ({ many }) => ({
  events: many(events),
}));

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  blockId: serial("block_id").references(() => blocks.id, {
    onDelete: "cascade",
  }),
  title: varchar("title").notNull(),
  description: varchar("description"),
  location: locationEnum("location").notNull().default("UNASSIGNED"),
  linkUrl: varchar("link_url"),
  linkLabel: varchar("link_label"),
  category: categoryEnum("category").notNull().default("OTHER"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export type NewEvent = typeof events.$inferInsert;
export type Event = typeof events.$inferSelect;
export const insertEventSchema = createInsertSchema(events);
export type InsertEventSchema = z.infer<typeof insertEventSchema>;

export const eventRelations = relations(events, ({ one, many }) => ({
  block: one(blocks, {
    fields: [events.blockId],
    references: [blocks.id],
  }),
  speakers: many(speakers),
}));

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
