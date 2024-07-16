"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-white">
            Home
          </a>
          <a href="/me" className="ml-4 text-white">
            Profile
          </a>
          <a href="/graph" className="ml-4 text-white">
            Graph Data
          </a>
          <a href="/data" className="ml-4 text-white">
            API Call
          </a>
        </div>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">
                Hello, {session.user?.displayName}
              </span>
                <LogoutButton
                  tenant="dardeus3"
                  flowName="B2C_1_ONE"
                  redirectUrl="http://localhost:3000"
                  className="inline-block"
                />
            </>
          ) : (
            <button onClick={() => signIn()} className="text-white">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
