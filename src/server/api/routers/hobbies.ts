import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hobbiesRouter = createTRPCRouter({
  getHobbies: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.hobbies.findMany();
  }),
});
