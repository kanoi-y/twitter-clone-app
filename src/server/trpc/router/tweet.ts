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
        },
      });
    }),
  getTweetsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        onlyImage: z.boolean().optional(),
        skip: z.number().optional(),
        take: z.number(),
        cursorId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.tweet.findMany({
        where: {
          createdUserId: input.userId,
          NOT: input.onlyImage ? { image: undefined } : undefined,
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
