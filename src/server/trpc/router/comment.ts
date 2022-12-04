import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const commentRouter = router({
  getComments: publicProcedure
    .input(
      z.object({
        targetTweetId: z.string().optional(),
        commentTweetId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: {
          targetTweetId: input.targetTweetId,
          commentTweetId: input.commentTweetId,
        },
        include: {
          targetTweet: true,
          commentTweet: true,
        },
      });
    }),
  createComment: protectedProcedure
    .input(
      z.object({
        targetTweetId: z.string(),
        commentTweetId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const targetTweet = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.targetTweetId,
        },
      });

      const commentTweet = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.commentTweetId,
        },
      });

      if (!commentTweet || !targetTweet) {
        throw new TRPCError({
          message: "対象のtweetが存在しません",
          code: "NOT_FOUND",
        });
      }

      if (commentTweet.createdUserId !== ctx.session.user.id) {
        throw new TRPCError({
          message: "対象のtweetをコメントにする権限がありません",
          code: "FORBIDDEN",
        });
      }

      return ctx.prisma.comment.create({
        data: {
          targetTweetId: input.targetTweetId,
          commentTweetId: input.commentTweetId,
        },
        include: {
          targetTweet: true,
          commentTweet: true,
        },
      });
    }),
});
