"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserInformation = () => {
  const { data: session } = useSession();
  return session ? (
    <div>
      <p>
        <strong>AccessToken:</strong> {session.accessToken}
      </p>
      <p>
        <strong>IdToken:</strong> {session.idToken}
      </p>
    </div>
  ) : (
    <p>Please log in to see your profile.</p>
  );
};

export default UserInformation;
