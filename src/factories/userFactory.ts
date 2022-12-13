import type { User } from "@prisma/client";
import { nextFactoryId } from "./factory";

export const userFactory = (options?: Partial<User>): User => {
  return {
    id: nextFactoryId("user"),
    name: "name",
    email: "email",
    emailVerified: null,
    description: "description",
    image: null,
    ...options,
  };
};
