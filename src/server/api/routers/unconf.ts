import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  events,
  insertEventSchema,
  insertSpeakerSchema,
  speakers,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const unconfRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        event: insertEventSchema,
        organizer: insertSpeakerSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session?.user;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const eventResult = await ctx.db
        .insert(events)
        .values(input.event)
        .returning();

      await ctx.db.insert(speakers).values({
        ...input.organizer,
        eventId: eventResult[0]?.id,
      });
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

  getUnconfEvents: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.blocks
      .findMany({
        where: (e, { eq }) => eq(e.type, "UNCONF"),
        with: {
          events: {
            with: {
              speakers: true,
              block: true,
            },
          },
        },
      })
      .then((blocks) => blocks.flatMap((b) => b.events));
  }),
});
