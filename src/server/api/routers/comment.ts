import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { comments } from "~/server/db/schema";

export const commentsRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.insert(comments).values({
        content: input.content,
        createdById: ctx.session.user.id,
        createdByName: ctx.session.user.name,
      });

      return comment;
    }),
    getAllComments: publicProcedure.query(async ({ ctx }) => {
        const allComments = await ctx.db.select().from(comments).orderBy(comments.createdAt);
        return allComments;
      }),
});
