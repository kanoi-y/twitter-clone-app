import type { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  currentUser: User;
};

export const CreateTweet: FC<Props> = ({ currentUser }) => {
  return (
    <div className="flex items-start">
      {currentUser.image ? (
        <div className="avatar relative z-10 mr-3 hover:brightness-90">
          <Link href={`/${currentUser.id}`} className="w-12 rounded-full">
            <Image
              src="/images/twitter-icon.svg"
              alt=""
              width={48}
              height={48}
            />
          </Link>
        </div>
      ) : (
        <div className="placeholder avatar relative z-10 mr-3 hover:brightness-90">
          <Link
            className="w-12 rounded-full bg-neutral-focus text-neutral-content"
            href={`/${currentUser.id}`}
          >
            <span className="text-xl">{currentUser.name?.charAt(0)}</span>
          </Link>
        </div>
      )}
      <div className="flex-1">
        <div className="border-b border-[rgb(239,243,244)]">
          <textarea
            className="textarea w-full resize-none text-xl text-[rgb(15,20,25)] focus:outline-none active:outline-none"
            placeholder="いまどうしてる？"
          ></textarea>
        </div>
        <div className="flex justify-end pt-3">
          <button className="btn-primary btn rounded-full border-none text-white text-base">
            ツイートする
          </button>
        </div>
      </div>
    </div>
  );
};
