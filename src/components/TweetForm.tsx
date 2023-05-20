import React, { useState } from "react";
import { Button } from "./ui/button";
import ProfileImage from "./ProfileImage";
import { api } from "@/utils/api";

const TweetForm: React.FC = (): React.JSX.Element => {
  const [content, setContent] = useState<string>("");
  const createTweet = api.tweet.create.useMutation({
    onSuccess(newText) {
      console.log(newText);
      setContent("");
    },
  });

  const SaveTweet = () => {
    if (content.length > 0) {
      createTweet.mutate({ content });
    }
  };
  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage />
        <textarea
          value={content}
          placeholder="What's is happening"
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <Button
        className="self-end bg-sky-500 hover:bg-sky-600"
        type="button"
        onClick={SaveTweet}
      >
        Tweet
      </Button>
    </form>
  );
};

export default TweetForm;
