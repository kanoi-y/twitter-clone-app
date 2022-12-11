import type { Tweet } from "@prisma/client";
import { nextFactoryId } from "./factory";

export const tweetFactory = (options?: Partial<Tweet>): Tweet => {
  return {
    id: nextFactoryId("tweet"),
    text: "tweet text",
    image: null,
    createdUserId: "createdUserId",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  };
};
