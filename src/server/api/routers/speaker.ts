import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  speakers,
  insertSpeakerSchema,
  speakersToEvents,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const speakerRouter = createTRPCRouter({
  add: adminProcedure
    .input(
      z.object({
        speaker: insertSpeakerSchema,
        eventId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [insertedSpeaker] = await ctx.db
        .insert(speakers)
        .values(input.speaker)
        .returning();
      await ctx.db.insert(speakersToEvents).values({
        eventId: input.eventId,
        speakerId: insertedSpeaker?.id,
      });
    }),

  delete: adminProcedure
    .input(insertSpeakerSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Speaker ID is required");
      }
      await ctx.db.delete(speakers).where(eq(speakers.id, input.id));
      await ctx.db
        .delete(speakersToEvents)
        .where(eq(speakersToEvents.speakerId, input.id));
    }),

  update: protectedProcedure
    .input(insertSpeakerSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Speaker ID is required");
      }
      await ctx.db
        .update(speakers)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(speakers.id, input.id));
    }),
});
