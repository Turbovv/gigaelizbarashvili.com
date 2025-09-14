import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { projects } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const projectsRouter = createTRPCRouter({
  getProjects: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.projects.findMany();
  }),
  getProjectById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      });

      if (!project) {
        throw new Error("Project not found");
      }

      return project;
    }),
});
