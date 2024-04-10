import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { events, insertEventSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const eventRouter = createTRPCRouter({
  add: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(events).values(input);
    }),

  update: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Event ID is required");
      }
      await ctx.db.update(events).set(input).where(eq(events.id, input.id));
    }),
});
