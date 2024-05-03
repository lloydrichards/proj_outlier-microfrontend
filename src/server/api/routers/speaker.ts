import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { speakers, insertSpeakerSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const speakerRouter = createTRPCRouter({
  add: adminProcedure
    .input(insertSpeakerSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(speakers).values(input);
    }),

  delete: adminProcedure
    .input(insertSpeakerSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Speaker ID is required");
      }
      await ctx.db.delete(speakers).where(eq(speakers.id, input.id));
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
