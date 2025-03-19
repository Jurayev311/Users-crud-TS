import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types";

const Users = () => {
  const { users, addUser, deleteUser } = useUsers();
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    f_name: "",
    l_name: "",
    profession: "",
    age: 0,
    gender: "male",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({ f_name: "", l_name: "", profession: "", age: 0, gender: "male" });
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
            <button 
              onClick={() => deleteUser(user.id)}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
            >
              O‘chirish
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Yangi foydalanuvchi qo‘shish</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Ism"
          value={newUser.f_name}
          onChange={(e) => setNewUser({ ...newUser, f_name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Familiya"
          value={newUser.l_name}
          onChange={(e) => setNewUser({ ...newUser, l_name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Kasb"
          value={newUser.profession}
          onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Yosh"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: Number(e.target.value) })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={newUser.gender}
          onChange={(e) => setNewUser({ ...newUser, gender: e.target.value as "male" | "female" })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
        >
          <option value="male">Erkak</option>
          <option value="female">Ayol</option>
        </select>
        <button
          type="submit"
          className="col-span-2 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Qo‘shish
        </button>
      </form>
    </div>
  );
};

export default Users;
