"use client";
import TextCode from "@component/TextCode";
import { useSession } from "next-auth/react";
import { Suspense, useState } from "react";

const DataPage: React.FC = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<string>();

  const fetchData = async () => {
    if (session) {
      const res = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await res.json();
      setData(JSON.stringify(data, null, 2));
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Data Page</h1>
      {session ? (
        <Suspense fallback={<p>Loading...</p>}>
          <div className="mt-4 flex-col">
            <button
              onClick={fetchData}
              className="mt-4 bg-blue-500 text-white px-4 py-2"
            >
              Fetch Data
            </button>
            <TextCode className="mt-4 " code={data ?? ""} language="json" />
          </div>
        </Suspense>
      ) : (
        <p>Please log in to see the data.</p>
      )}
    </main>
  );
};

export default DataPage;
