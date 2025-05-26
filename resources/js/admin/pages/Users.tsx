import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { User, UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";
import { Modal } from "@/shared/components/Modal";
import axios from "axios";
import { useAuth } from "@/shared/contexts/AuthContext";

export const Users: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "client",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleOpenAdd = () => {
    setCurrentUser({ id: "", name: "", email: "", password: "", role: "client" });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEdit = (user: User) => {
    setCurrentUser(user);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/v1/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSubmit = async () => {
    if (editMode) {
      const resp = await axios.put(`/api/v1/users/${currentUser.id}`, currentUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map(u => (u.id === currentUser.id ? resp.data : u)));
    } else {
      const { id, ...toCreate } = currentUser;
      const resp = await axios.post("/api/v1/users", toCreate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([...users, resp.data]);
    }
    setOpenDialog(false);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 text-gray-800">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Usuários</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Pesquisar usuários"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 bg-white rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 w-full md:w-64"
          />
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            <Icon icon="mdi:plus" className="w-5 h-5" />
            Adicionar
          </button>
        </div>
      </div>

      <UserTable users={filtered} onEdit={handleOpenEdit} onDelete={handleDelete} />

      {openDialog && (
        <Modal title={editMode ? "Editar Usuário" : "Novo Usuário"} onClose={handleCloseDialog}>
          <UserForm user={currentUser} onChange={setCurrentUser} />
          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={handleCloseDialog}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!currentUser.name || !currentUser.email || (!editMode && !currentUser.password)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition"
            >
              {editMode ? "Salvar" : "Adicionar"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
