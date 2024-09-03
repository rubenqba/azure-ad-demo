// app/users/page.tsx
import ClientsTable from "@component/clients/ClientsTable";
import { getClients } from "@lib/clients";
import { Client } from "@model/users";

export default async function ClientsPage() {
  const {data, error} = await getClients();
  return (<ClientsTable headerTitle="Client list" clients={data ?? []} />);
};
