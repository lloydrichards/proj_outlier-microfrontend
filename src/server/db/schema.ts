// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

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
export const insertBlockSchema = createInsertSchema(blocks);

export const blockRelations = relations(blocks, ({ many }) => ({
  events: many(events),
}));

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  block_id: serial("block_id").references(() => blocks.id),
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
export const insertEventSchema = createInsertSchema(events);

export const eventRelations = relations(events, ({ one, many }) => ({
  block: one(blocks, {
    fields: [events.block_id],
    references: [blocks.id],
  }),
  speakers: many(speakers),
}));

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  event_id: serial("event_id").references(() => events.id),
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
export const insertSpeakerSchema = createInsertSchema(speakers);

export const speakerRelations = relations(speakers, ({ one }) => ({
  event: one(events, {
    fields: [speakers.event_id],
    references: [events.id],
  }),
}));
