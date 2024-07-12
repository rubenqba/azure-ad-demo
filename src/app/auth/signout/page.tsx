"use client";
import { signOut } from "next-auth/react";

export default function SignoutPage() {
  signOut({ callbackUrl: "http://localhost:3000" });
  return (
    <div>
      <h1>Signing out...</h1>
    </div>
  );
}