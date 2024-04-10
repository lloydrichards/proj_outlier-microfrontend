import { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
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

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
