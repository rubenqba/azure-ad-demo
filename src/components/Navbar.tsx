import Link from "next/link";
import SessionIndicator from "./SessionIndicator";

const Navbar: React.FC = () => {

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/me" className="text-white">
            Profile
          </Link>
          <Link href="/data" className="text-white">
            API Call
          </Link>
          <Link href="/clients" className="text-white">
            Clients
          </Link>
        </div>
        <SessionIndicator />
      </div>
    </nav>
  );
};

export default Navbar;
