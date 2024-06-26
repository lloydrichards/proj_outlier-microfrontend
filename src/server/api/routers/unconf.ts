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
  speakersToEvents,
} from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

export const unconfRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        event: insertEventSchema,
        organizers: z.array(insertSpeakerSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [insertedEvent] = await ctx.db
        .insert(events)
        .values(input.event)
        .returning();

      for (const organizer of input.organizers) {
        const [insertedOrganizer] = await ctx.db
          .insert(speakers)
          .values(organizer)
          .onConflictDoUpdate({
            target: [speakers.firstName, speakers.lastName],
            set: { ...organizer, updatedAt: new Date() },
          })
          .returning();

        await ctx.db.insert(speakersToEvents).values({
          speakerId: insertedOrganizer?.id,
          eventId: insertedEvent?.id,
        });
      }
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

  getUnconfEvents: protectedProcedure
    .input(
      z.object({
        edition: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.blocks
        .findMany({
          where: (e, { eq, and }) =>
            input.edition
              ? and(eq(e.edition, input.edition), eq(e.type, "UNCONF"))
              : eq(e.type, "UNCONF"),
          with: {
            events: {
              with: {
                speakers: {
                  with: {
                    speaker: {
                      extras: {
                        fullName:
                          sql<string>`concat(${speakers.firstName},' ', ${speakers.lastName})`.as(
                            "full_name",
                          ),
                      },
                    },
                  },
                },
                block: true,
              },
            },
          },
        })
        .then((blocks) => blocks.flatMap((b) => b.events));
    }),
});
