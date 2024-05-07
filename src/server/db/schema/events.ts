import { relations, sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type * as z from "zod";
import { blocks } from "./blocks";
import { speakers } from "./speakers";

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
  "DVS",
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

export const statusEnum = pgEnum("status", ["PENDING", "ACCEPTED", "REJECTED"]);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  blockId: serial("block_id").references(() => blocks.id, {
    onDelete: "cascade",
  }),
  title: varchar("title").notNull(),
  description: varchar("description"),
  location: locationEnum("location").notNull().default("UNASSIGNED"),
  imageUrl: varchar("image_url"),
  linkUrl: varchar("link_url"),
  linkLabel: varchar("link_label"),
  category: categoryEnum("category").notNull().default("OTHER"),
  status: statusEnum("status").notNull().default("PENDING"),
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
