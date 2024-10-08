"use client";
import { deleteCurrentProfile, getAzureEndpoint } from "@action/profile";
import TextCode from "@component/TextCode";
import { Suspense, useState, useTransition } from "react";

export default function DataPage() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState("");

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Data Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
      <div className="mt-4 flex-col">
          <div className="flex gap-4">
            <button
              onClick={() => {
                startTransition(async () => {
                  const data = await getAzureEndpoint();
                  console.debug(data)
                  setData(data);
                });
              }}
              className="mt-4 bg-blue-500 text-white px-4 py-2"
              disabled={isPending}
            >
              Fetch Data {isPending ? "..." : ""}
            </button>
            <button
              onClick={() => {
                startTransition(async () => {
                  const data = await deleteCurrentProfile();
                  console.debug(data)
                  setData(data);
                });
              }}
              className="mt-4 bg-blue-500 text-white px-4 py-2"
              disabled={isPending}
            >
              Delete current User
            </button>
          </div>
          <TextCode className="mt-4 " code={data} language="json" />
        </div>
      </Suspense>
    </main>
  );
};
