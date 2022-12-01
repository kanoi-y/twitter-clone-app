import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const favoriteRouter = router({
  getFavorites: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        tweetId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.favorite.findMany({
        where: {
          createdUserId: input.userId,
          tweetId: input.tweetId,
        },
        include: {
          createdUser: true,
          tweet: true,
        },
      });
    }),
  createFavorite: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tweet = await ctx.prisma.tweet.findUnique({
        where: {
          id: input.tweetId,
        },
      });

      if (!tweet) {
        throw new TRPCError({
          message: "対象のtweetが存在しません",
          code: "NOT_FOUND",
        });
      }

      return ctx.prisma.favorite.create({
        data: {
          createdUserId: ctx.session.user.id,
          tweetId: input.tweetId,
        },
      });
    }),
  deleteFavorite: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const favorite = await ctx.prisma.favorite.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!favorite) {
        throw new TRPCError({
          message: "対象のfavoriteが存在しません",
          code: "NOT_FOUND",
        });
      }

      return ctx.prisma.favorite.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
