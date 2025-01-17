import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const softwaresRouter = createTRPCRouter({
  getSoftwares: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.softwares.findMany();
  }),
});
