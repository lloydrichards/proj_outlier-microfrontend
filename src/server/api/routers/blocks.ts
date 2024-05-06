import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { blocks, insertBlockSchema, speakers } from "@/server/db/schema";
import { eq, min, sql } from "drizzle-orm";

export const blockRouter = createTRPCRouter({
  add: adminProcedure
    .input(insertBlockSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(blocks).values(input);
    }),

  delete: adminProcedure
    .input(insertBlockSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Block ID is required");
      }
      await ctx.db.delete(blocks).where(eq(blocks.id, input.id));
    }),

  update: protectedProcedure
    .input(insertBlockSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Block ID is required");
      }
      await ctx.db
        .update(blocks)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(blocks.id, input.id));
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.blocks.findMany({
      where: (b, { eq }) => eq(b.isActive, true),
      orderBy: (blocks, { asc }) => [asc(blocks.start)],
      extras: {
        duration:
          sql<number>`ROUND(EXTRACT(EPOCH FROM (${blocks.end} - ${blocks.start}))/60)`.as(
            "duration",
          ),
      },
      with: {
        events: {
          with: {
            speakers: {
              extras: {
                fullName:
                  sql<string>`concat(${speakers.firstName},' ', ${speakers.lastName})`.as(
                    "full_name",
                  ),
              },
            },
          },
        },
      },
    });
  }),
});
