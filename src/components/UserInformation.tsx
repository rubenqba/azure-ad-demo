"use client";
import { useSession } from "next-auth/react";
import React from "react";
import ShowToken from "./ShowToken";
import TextCode from "./TextCode";
import JWTDisplay from "./JWTDisplay";

const UserInformation = () => {
  const { data: session } = useSession();
  return session ? (
    <div>
      <div className="flex flex-col mt-4">
        <strong>User data:</strong>
        <TextCode
          language="json"
          code={JSON.stringify(session.user, null, 2)}
        />
      </div>
      <div className="flex flex-col mt-4">
        <strong>Access Token:</strong>
        <JWTDisplay token={session.accessToken} />
      </div>
    </div>
  ) : (
    <p>Please log in to see your profile.</p>
  );
};

export default UserInformation;
