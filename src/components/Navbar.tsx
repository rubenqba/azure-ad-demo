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
          <a href="/data" className="ml-4 text-white">
            Data
          </a>
        </div>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">
                Hello, {session.user?.name}
              </span>
              {/* {process.env.ZURE_AD_B2C_TENANT_NAME ? ( */}
                <LogoutButton
                  tenant="dardeus3"
                  flowName="B2C_1_ONE"
                  redirectUrl="http://localhost:3000"
                  className="inline-block"
                />
              {/* ) : (
                <button onClick={() => signOut()} className="text-white">
                  Logout
                </button>
              )} */}
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
