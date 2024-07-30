import Link from "next/link";
import SessionIndicator from "./SessionIndicator";

const Navbar: React.FC = () => {

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/me" className="ml-4 text-white">
            Profile
          </Link>
          <Link href="/data" className="ml-4 text-white">
            API Call
          </Link>
        </div>
        <SessionIndicator />
      </div>
    </nav>
  );
};

export default Navbar;
