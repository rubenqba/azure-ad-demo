"use client";
import { useSession } from "next-auth/react";
import React from "react";
import ShowToken from "./ShowToken";

const UserInformation = () => {
  const { data: session } = useSession();
  return session ? (
    <div>
      <ShowToken title="Access Token" token={session.accessToken} />
      <ShowToken title="ID Token" token={session.idToken} />
      <ShowToken title="Session" token={JSON.stringify(session.user, null, 2)} />
    </div>
  ) : (
    <p>Please log in to see your profile.</p>
  );
};

export default UserInformation;
