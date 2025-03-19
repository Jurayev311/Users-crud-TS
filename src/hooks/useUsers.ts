import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types";

const API_URL = "http://localhost:3000/users";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  const addUser = async (newUser: Omit<User, "id">) => {
    try {
      const res = await axios.post(API_URL, newUser);
      setUsers([...users, res.data]);
    } catch (err) {
      console.error("Qo‘shishda xatolik:", err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  return { users, addUser, deleteUser };
};
