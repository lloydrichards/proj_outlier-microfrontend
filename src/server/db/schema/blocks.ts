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
import type { z } from "zod";
import { events } from "./events";

export const blockEnum = pgEnum("block", [
  "SPEAKER",
  "LIGHTNING",
  "PAUSE",
  "ANNOUNCEMENT",
  "NETWORKING",
  "UNCONF",
]);

export const blocks = pgTable(
  "blocks",
  {
    id: serial("id").primaryKey(),
    edition: varchar("edition")
      .notNull()
      .default(sql`date_part('year', CURRENT_DATE)`),
    type: blockEnum("type").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    start: timestamp("start").unique().notNull(),
    end: timestamp("end").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
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
