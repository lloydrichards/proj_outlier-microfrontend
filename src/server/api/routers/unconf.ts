import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { events, insertEventSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const unconfRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(events).values(input);
    }),

  accept: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Event ID is required");
      }
      await ctx.db
        .update(events)
        .set({ ...input, updatedAt: new Date(), status: "ACCEPTED" })
        .where(eq(events.id, input.id));
    }),

  reject: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Event ID is required");
      }
      await ctx.db
        .update(events)
        .set({ ...input, updatedAt: new Date(), status: "REJECTED" })
        .where(eq(events.id, input.id));
    }),
});
