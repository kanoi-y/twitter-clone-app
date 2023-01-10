import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const tweetRouter = router({
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
        where: {
          comments: {
            none: {},
          },
        },
        skip: input.skip,
        take: input.take,
        cursor: {
          id: input.cursorId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          comments: true,
          targetTweetComments: true,
          createdUser: {
            select: {
              id: true,
              name: true,
              image: true,
              description: true,
            },
          },
        },
      });
    }),
  getTweetsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        skip: z.number().optional(),
        take: z.number(),
        cursorId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.tweet.findMany({
        where: {
          createdUserId: input.userId
        },
        skip: input.skip,
        take: input.take,
        cursor: {
          id: input.cursorId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          comments: true,
          createdUser: {
            select: {
              id: true,
              name: true,
              image: true,
              description: true,
            },
          },
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
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet.create({
        data: {
          text: input.text,
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
