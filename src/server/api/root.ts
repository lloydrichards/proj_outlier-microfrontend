import { blockRouter } from "@/server/api/routers/blocks";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { speakerRouter } from "./routers/speaker";
import { eventRouter } from "./routers/events";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  block: blockRouter,
  event: eventRouter,
  speaker: speakerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
