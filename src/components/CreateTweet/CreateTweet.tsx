import type { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  currentUser: User;
};

export const CreateTweet: FC<Props> = ({ currentUser }) => {
  return (
    <div className="flex">
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
      <div>
        <textarea
          className="textarea"
          placeholder="いまどうしてる？"
        ></textarea>
        <div>
          <button className="btn">ツイートする</button>
        </div>
      </div>
    </div>
  );
};
