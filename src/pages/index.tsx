import { InfiniteTweetList } from "@/components/InfiniteTweetList";
import TweetForm from "@/components/TweetForm";
import { NextPage } from "next";

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
  return <InfiniteTweetList />;
}
export default Home;
