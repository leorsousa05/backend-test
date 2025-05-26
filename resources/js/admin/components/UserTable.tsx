// UserTable.tsx
import React from "react";
import { Icon } from "@iconify/react";
import { User } from "./UserForm";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-2 text-left">Nome</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Função</th>
          <th className="px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map(u => (
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">{u.name}</td>
            <td className="px-4 py-3 text-gray-600">{u.email}</td>
            <td className="px-4 py-3 text-gray-600">{u.role === "admin" ? "Admin" : "Client"}</td>
            <td className="px-4 py-3 text-center space-x-4">
              <button onClick={() => onEdit(u)} className="text-blue-600 hover:text-blue-800">
                <Icon icon="mdi:pencil" className="w-5 h-5" />
              </button>
              <button onClick={() => onDelete(u.id)} className="text-red-600 hover:text-red-800">
                <Icon icon="mdi:delete" className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

