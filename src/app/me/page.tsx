import UserInformation from "@component/UserInformation";

export default function MePage() {
  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <UserInformation />
      </main>
    </div>
  );
}
