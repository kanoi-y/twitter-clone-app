import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          message: "対象のTodoが存在しません",
          code: "NOT_FOUND",
        });
      }

      if (user.id !== ctx.session.user.id) {
        throw new TRPCError({
          message: "対象のodoを更新する権限がありません",
          code: "FORBIDDEN",
        });
      }

      const updateUser = {
        name: input.name || user.name,
        description: input.description || user.description,
        image: input.image || user.image,
      };

      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: updateUser,
      });
    }),
});
