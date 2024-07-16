import AzureUserData from "@component/AzureUserData";

export default function AzureGraph() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Azure AD B2C Graph data</h1>
      <AzureUserData className="mt-4"/>
    </main>
  );
}
