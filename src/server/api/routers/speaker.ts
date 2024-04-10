import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { speakers, insertSpeakerSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const speakerRouter = createTRPCRouter({
  add: protectedProcedure
    .input(insertSpeakerSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(speakers).values(input);
    }),

  update: protectedProcedure
    .input(insertSpeakerSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Speaker ID is required");
      }
      await ctx.db.update(speakers).set(input).where(eq(speakers.id, input.id));
    }),
});
