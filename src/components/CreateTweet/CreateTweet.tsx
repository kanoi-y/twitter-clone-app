import type { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import { useAutoResizeTextArea } from "~/hooks";
import { trpc } from "~/utils/trpc";

type Props = {
  currentUser: User;
};

export const CreateTweet: FC<Props> = ({ currentUser }) => {
  const utils = trpc.useContext();

  const [tweetText, setTweetText] = useState("");
  const textAreaRef = useAutoResizeTextArea(tweetText);
  const createTweet = trpc.tweet.createTweet.useMutation({
    async onSuccess() {
      await utils.tweet.getTweets.invalidate();
    },
  });

  const handleClickTweetBtn = async () => {
    await createTweet.mutateAsync({ text: tweetText });
    setTweetText("");
  };

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
            className="textarea w-full resize-none overflow-hidden text-xl text-[rgb(15,20,25)] focus:outline-none active:outline-none"
            placeholder="いまどうしてる？"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            ref={textAreaRef}
          />
        </div>
        <div className="flex justify-end pt-3">
          <button
            className="btn-primary btn rounded-full border-none text-base text-white disabled:bg-primary disabled:text-white disabled:opacity-60"
            disabled={tweetText.trim().length === 0}
            onClick={handleClickTweetBtn}
          >
            ツイートする
          </button>
        </div>
      </div>
    </div>
  );
};
