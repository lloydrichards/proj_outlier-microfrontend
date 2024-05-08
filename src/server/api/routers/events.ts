import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  events,
  insertEventSchema,
  speakersToEvents,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const eventRouter = createTRPCRouter({
  add: adminProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(events).values({ ...input, status: "ACCEPTED" });
    }),

  delete: adminProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Event ID is required");
      }
      await ctx.db.delete(events).where(eq(events.id, input.id));
      await ctx.db
        .delete(speakersToEvents)
        .where(eq(speakersToEvents.eventId, input.id));
    }),

  update: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Event ID is required");
      }
      await ctx.db
        .update(events)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(events.id, input.id));
    }),
});
