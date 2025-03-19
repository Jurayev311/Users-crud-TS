import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";

const Users = () => {
  const { users, addUser, deleteUser, editUser } = useUsers();
  const [updateUser, setUpdate] = useState<User | null>(null);

  const [newUser, setNewUser] = useState<User>({
    id: uuidv4(),
    f_name: "",
    l_name: "",
    profession: "",
    age: 0,
    gender: "male",
  });

  const handleEditClick = (user: User) => {
    setUpdate(user);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUser) {
      editUser(updateUser.id, updateUser);
      setUpdate(null);
    } else {
      addUser({ ...newUser, id: uuidv4() });
    }
    setNewUser({ id: uuidv4(), f_name: "", l_name: "", profession: "", age: 0, gender: "male" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Foydalanuvchilar</h2>

      <ul className="space-y-4 mb-6">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow">
            <span className="text-gray-800 font-medium">
              {user.f_name} {user.l_name} - {user.profession} ({user.age} yosh)
            </span>
            <div className="space-x-2">
              <button
                onClick={() => deleteUser(user.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              >
                O‘chirish
              </button>
              <button
                onClick={() => handleEditClick(user)}
                className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
              >
                Tahrirlash
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">{updateUser ? "Foydalanuvchini tahrirlash" : "Yangi foydalanuvchi qo‘shish"}</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Ism"
          value={updateUser ? updateUser.f_name : newUser.f_name}
          onChange={(e) =>
            updateUser
              ? setUpdate({ ...updateUser, f_name: e.target.value })
              : setNewUser({ ...newUser, f_name: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Familiya"
          value={updateUser ? updateUser.l_name : newUser.l_name}
          onChange={(e) =>
            updateUser
              ? setUpdate({ ...updateUser, l_name: e.target.value })
              : setNewUser({ ...newUser, l_name: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Kasb"
          value={updateUser ? updateUser.profession : newUser.profession}
          onChange={(e) =>
            updateUser
              ? setUpdate({ ...updateUser, profession: e.target.value })
              : setNewUser({ ...newUser, profession: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Yosh"
          value={updateUser ? updateUser.age : newUser.age}
          onChange={(e) =>
            updateUser
              ? setUpdate({ ...updateUser, age: Number(e.target.value) })
              : setNewUser({ ...newUser, age: Number(e.target.value) })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={updateUser ? updateUser.gender : newUser.gender}
          onChange={(e) =>
            updateUser
              ? setUpdate({ ...updateUser, gender: e.target.value as "male" | "female" })
              : setNewUser({ ...newUser, gender: e.target.value as "male" | "female" })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
        >
          <option value="male">Erkak</option>
          <option value="female">Ayol</option>
        </select>
        <button
          type="submit"
          className="col-span-2 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          {updateUser ? "Saqlash" : "Qo‘shish"}
        </button>
      </form>
    </div>
  );
};

export default Users;
