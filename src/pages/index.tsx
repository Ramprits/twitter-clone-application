import { type NextPage } from "next";
import { InfiniteTweetList } from "@/components/InfiniteTweetList";
import TweetForm from "@/components/TweetForm";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-4">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <TweetForm />
      <RecentTweets />
    </>
  );
};

function RecentTweets() {
  const tweetFeed = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  return (
    <InfiniteTweetList
      tweets={tweetFeed.data?.pages.flatMap((tweet) => tweet.tweets)}
      isError={tweetFeed.isError}
      isLoading={tweetFeed.isLoading}
      hasMore={tweetFeed.hasNextPage || false}
      fetchNewTweets={tweetFeed.fetchNextPage}
    />
  );
}
export default Home;
