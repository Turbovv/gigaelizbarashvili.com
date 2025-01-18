import { interestsRouter } from "./routers/interest";
import { skillsRouter } from "./routers/skill";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { softwaresRouter } from "./routers/software";
import { hostingsRouter } from "./routers/hosting";
import { hobbiesRouter } from "./routers/hobbies";
import { projectsRouter } from "./routers/project";
import { commentsRouter } from "./routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  skills: skillsRouter,
  interests: interestsRouter,
  softwares: softwaresRouter,
  hostings: hostingsRouter,
  hobbies: hobbiesRouter,
  projects: projectsRouter,
  comments: commentsRouter,
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
