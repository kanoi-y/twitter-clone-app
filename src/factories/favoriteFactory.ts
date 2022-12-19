import type { Favorite } from "@prisma/client";
import { nextFactoryId } from "./factory";

export const favoriteFactory = (options?: Partial<Favorite>): Favorite => {
  return {
    id: nextFactoryId("favorite"),
    createdUserId: "createdUserId",
    tweetId: "tweetId",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  };
};
