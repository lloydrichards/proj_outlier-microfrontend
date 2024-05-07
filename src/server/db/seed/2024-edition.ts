import type { db } from "..";
import {
  type InsertBlockSchema,
  type InsertEventSchema,
  type InsertSpeakerSchema,
  blocks,
  events,
  speakers,
} from "../schema";
import data from "./data/2024-edition.json";

export const seed2024Edition = async (db: db) => {
  await Promise.all(
    data.map(async (block) => {
      const [insertedBlock] = await db
        .insert(blocks)
        .values({
          ...block,
          start: new Date(block.start),
          end: new Date(block.end),
          edition: "2024",
          isActive: true,
        } as InsertBlockSchema)
        .returning();

      await Promise.all(
        block.events?.map(async (event) => {
          const [insertedEvent] = await db
            .insert(events)
            .values({
              ...event,
              status: "ACCEPTED",
              blockId: insertedBlock?.id,
            } as InsertEventSchema)
            .returning();

          await Promise.all(
            event.speakers?.map(async (speaker) => {
              await db
                .insert(speakers)
                .values({
                  ...speaker,
                  eventId: insertedEvent?.id,
                } as InsertSpeakerSchema)
                .returning();
            }) || [],
          );
        }) || [],
      );
    }),
  );
};