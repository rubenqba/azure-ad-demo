"use client";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { Client, StatusColorMap } from "@model/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "@component/UserAvatar";

type UserTableProps = {
  headerTitle: string;
  clients: Client[];
};

type IndexableClient = Client & {
  [key: string]: any;
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Team", uid: "team" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const ClientsTable = ({ clients, headerTitle }: Readonly<UserTableProps>) => {
  const renderCell = useCallback(
    (user: IndexableClient, columnKey: string | number) => {
      switch (columnKey) {
        case "name":
          return (
            <UserAvatar
              displayName={`${user.firstName} ${user.lastName}`}
              email={user.email}
            />
          );
        case "team":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.team?.name}</p>
              <p className="text-bold text-sm text-default-400">
                {user.team?.subscription}
              </p>
            </div>
          );
        case "status":
          return user.roles.map((role) => (
            <Chip
              className="capitalize"
              color={StatusColorMap[role]}
              size="sm"
              variant="flat"
              key={`${user.id}-${role}`}
            >
              {role}
            </Chip>
          ));
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FontAwesomeIcon icon={faEdit} />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <span />;
      }
    },
    []
  );

  return (
    <section>
      <h1>{headerTitle}</h1>
      <Table aria-label="Client list">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No clients to display."} items={clients}>
          {(item) => (
            <TableRow key={item.id} data-key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default ClientsTable;
