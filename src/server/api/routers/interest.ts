import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const interestsRouter = createTRPCRouter({
  getInterests: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.interests.findMany();
  }),
});
