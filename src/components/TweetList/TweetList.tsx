import type { Tweet, User } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import type { FC } from "react";

type Props = {
  tweet: Tweet;
  createdUser: Omit<User, "email" | "emailVerified">;
};

export const TweetList: FC<Props> = ({ tweet, createdUser }) => {
  return (
    <div className="flex cursor-pointer items-start border-b border-[rgb(239,243,244)] px-4 py-3 hover:bg-slate-50">
      {createdUser.image ? (
        <div className="avatar mr-3 hover:brightness-90">
          <div className="w-12 rounded-full">
            <Image
              src="/images/twitter-icon.svg"
              alt=""
              width={48}
              height={48}
            />
          </div>
        </div>
      ) : (
        <div className="placeholder avatar mr-3">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-xl">{createdUser.name?.charAt(0)}</span>
          </div>
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center">
          <p className="font-bold hover:underline">{createdUser.name}</p>
          <span className="ml-1 text-[rgb(83,100,113)]">・</span>
          <span className="text-[rgb(83,100,113)] hover:underline">
            {formatDistanceToNowStrict(tweet.createdAt, { locale: ja })}
          </span>
        </div>
        <div className="mb-3">{tweet.text}</div>
        <div className="flex w-1/2">
          <div className="flex-1">
            <button className="flex w-fit items-center text-[rgb(83,100,113)] hover:text-[rgb(29,155,240)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <span className="block px-3 text-sm text-current">2</span>
            </button>
          </div>
          <div className="flex-1">
            <button className="flex w-fit items-center text-[rgb(83,100,113)] hover:text-[rgb(249,24,128)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className="px-3 text-sm text-current">2</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
