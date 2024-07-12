"use client";

import { useSession } from "next-auth/react";
import Navbar from "@component/Navbar";

const DataPage: React.FC = () => {
  const { data: session } = useSession();

  const fetchData = async () => {
    if (session) {
      const res = await fetch("/api/your-api-endpoint", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Data Page</h1>
      {session ? (
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-500 text-white px-4 py-2"
        >
          Fetch Data
        </button>
      ) : (
        <p>Please log in to see the data.</p>
      )}
    </main>
  );
};

export default DataPage;
