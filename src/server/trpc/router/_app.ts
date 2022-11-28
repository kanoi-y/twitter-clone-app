import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { tweetRouter } from "./tweet";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  tweet: tweetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
