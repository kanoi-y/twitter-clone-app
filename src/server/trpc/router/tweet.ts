import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const tweetRouter = router({
  // TODO: コメントのツイートを取得しないように実装する
  getTweets: publicProcedure
    .input(
      z.object({
        skip: z.number().optional(),
        take: z.number(),
        cursorId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.tweet.findMany({
        skip: input.skip,
        take: input.take,
        cursor: {
          id: input.cursorId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getTweetById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tweet.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  createTweet: protectedProcedure
    .input(z.object({ text: z.string(), image: z.string().optional() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet.create({
        data: {
          text: input.text,
          image: input.image,
          createdUserId: ctx.session.user.id,
        },
      });
    }),
  deleteTweet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
