import type { Comment } from "@prisma/client";
import { nextFactoryId } from "./factory";

export const commentFactory = (options?: Partial<Comment>): Comment => {
  return {
    id: nextFactoryId("comment"),
    targetTweetId: "targetTweetId",
    commentTweetId: "commentTweetId",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...options,
  };
};
