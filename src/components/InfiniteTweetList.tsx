/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import InfiniteScroll from "react-infinite-scroll-component";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  user: { id: string; name: string | null; image: string | null };
  likedByMe: boolean;
};
interface props {
  tweets?: Tweet[];
  isError: boolean;
  isLoading: boolean;
  hasMore?: boolean;
  fetchNewTweets: () => Promise<unknown>;
}
export function InfiniteTweetList({
  tweets,
  isError,
  isLoading,
  hasMore,
  fetchNewTweets,
}: props) {
  if (isError) {
    return <div>Error...</div>;
  }
  if (isLoading) {
    return <div className="mt-10 text-center text-green-400">Loading...</div>;
  }
  if (tweets === null || tweets?.length === 0 || tweets === undefined) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }
  return (
    <InfiniteScroll
      dataLength={tweets?.length}
      next={fetchNewTweets}
      hasMore={hasMore || false}
      loader={"Loading..."}
    >
      {tweets?.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet}></TweetCard>
      ))}
    </InfiniteScroll>
  );
}

function TweetCard(props: Tweet) {
  return (
    <div className="flex gap-4 border-b p-4">
      <Link href={`/profile/${props.id}`}>
        {props.user.image && props.user.name && (
          <div className={`relative h-12 w-12 overflow-hidden rounded-full`}>
            <Image
              src={props.user.image}
              alt={props.user.name}
              quality={100}
              fill
            />
          </div>
        )}
      </Link>
      <div className="flex flex-col gap-1">
        <Link
          href={`/profile/${props.id}`}
          className="font-bold hover:underline"
        >
          {props.user.name}
        </Link>
        <span className="text-sm">{props.content}</span>
        <span>{props.createdAt.toDateString()}</span>
        <HeartButton likeByMe={props.likedByMe} likeCount={props.likeCount} />
      </div>
    </div>
  );
}

type HeartButtonProps = {
  likeByMe: boolean;
  likeCount: number;
};
function HeartButton(props: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = props.likeByMe ? VscHeartFilled : VscHeart;
  if (session.status !== "authenticated") {
    return null;
  }
  return (
    <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
      <HeartIcon />
      <span>{props.likeCount}</span>
    </div>
  );
}
