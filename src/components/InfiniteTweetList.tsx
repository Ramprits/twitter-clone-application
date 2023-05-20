import { api } from "@/utils/api";
import React from "react";
interface props {
  tweets: any[];
}
export function InfiniteTweetList() {
  const tweetFeeds = api.tweet.infiniteFeed.useInfiniteQuery({});
  console.log(tweetFeeds);
  return <div>Infinite Tweet List</div>;
}
