import { useSession } from "next-auth/react";
import React, { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileImage = () => {
  const session = useSession();
  if (session.status !== "authenticated") {
    return <Fragment />;
  }
  return (
    <Avatar>
      <AvatarImage
        src={session.data.user.image!}
        alt={session.data.user.name!}
      />
      <AvatarFallback>{session.data.user.name!}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
