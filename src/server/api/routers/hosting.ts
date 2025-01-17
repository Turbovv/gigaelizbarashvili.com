import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hostingsRouter = createTRPCRouter({
  getHostings: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.hostings.findMany();
  }),
});
