import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "client";
}

interface UserFormProps {
  user: User;
  onChange: (user: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onChange }) => {
  const creating = !user.id;
  const pwd = user.password || "";
  const validPwd = pwd.length >= 6;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={user.name}
          onChange={e => onChange({ ...user, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={e => onChange({ ...user, email: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Senha {creating && <span className="text-xs text-red-600">(mín 6 caracteres)</span>}
        </label>
        <input
          type="password"
          value={pwd}
          onChange={e => onChange({ ...user, password: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
          required={creating}
          minLength={6}
        />
        {creating && !validPwd && (
          <p className="mt-1 text-xs text-red-600">Senha deve ter ao menos 6 caracteres.</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Função</label>
        <select
          value={user.role}
          onChange={e => onChange({ ...user, role: e.target.value as "admin" | "client" })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-300"
          required
        >
          <option value="admin">Administrador</option>
          <option value="client">Cliente</option>
        </select>
      </div>
    </div>
);
};

