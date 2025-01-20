import { sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { likes } from "~/server/db/schema";

export const likesRouter = createTRPCRouter({
    toggleLike: protectedProcedure
  .input(z.object({ postId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    const existingLike = await ctx.db
      .select()
      .from(likes)
      .where(
        sql`${likes.commentId} = ${input.postId} AND ${likes.userId} = ${ctx.session.user.id}`
      )
      .limit(1)
      .execute();

    if (existingLike.length) {
      if (existingLike[0]) {
        await ctx.db.delete(likes).where(sql`${likes.id} = ${existingLike[0].id}`);
      }
    } else {
      await ctx.db.insert(likes).values({
        commentId: input.postId,
        userId: ctx.session.user.id,
      });
    }
  }),


    getLikes: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const likeCountResult = await ctx.db
        .select({ count: sql<number>`COUNT(*)` })
        .from(likes)
        .where(sql`${likes.commentId} = ${input.postId}`);
  
      const likeCount = likeCountResult[0]?.count || 0;
  
      return { postId: input.postId, likes: likeCount };
    }),
  
});
