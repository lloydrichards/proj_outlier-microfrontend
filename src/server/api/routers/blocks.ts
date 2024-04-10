import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { blocks, insertBlockSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const blockRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertBlockSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(blocks).values(input);
    }),

  update: protectedProcedure
    .input(insertBlockSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Block ID is required");
      }
      await ctx.db.update(blocks).set(input).where(eq(blocks.id, input.id));
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.blocks.findMany({
      where: (b, { eq }) => eq(b.isActive, true),
      orderBy: (blocks, { desc }) => [desc(blocks.start)],
      with: {
        events: {
          with: {
            speakers: true,
          },
        },
      },
    });
  }),
});
