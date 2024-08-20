// app/users/page.tsx
import ClientsTable from "@component/clients/ClientsTable";
import { getClients } from "@lib/clients";
import { Client } from "@model/users";

const users: Client[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: ["buyer"],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    role: ["admin"],
  },
  {
    id: "3",
    firstName: "Jim",
    lastName: "Beam",
    email: "jim.beam@example.com",
    role: ["buyer", "staff"],
  },
  {
    id: "4",
    firstName: "Jack",
    lastName: "Daniels",
    email: "jack.daniels@example.com",
    role: ["buyer"],
  },
  {
    id: "5",
    firstName: "Josie",
    lastName: "Wales",
    email: "josie.wales@example.com",
    role: ["admin", "buyer"],
  },
];

export default async function ClientsPage() {
  const {data, error} = await getClients();
  return (<ClientsTable headerTitle="Client list" clients={data ?? []} />);
};
