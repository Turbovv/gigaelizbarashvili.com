import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { projects } from "~/server/db/schema";
import { eq } from "drizzle-orm"; 

export const projectsRouter = createTRPCRouter({
  getProjects: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.projects.findMany();
  }),

});