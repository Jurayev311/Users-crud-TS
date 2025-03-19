import { useState } from "react";
import { User } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (id: string, updatedUser: User) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return { users, addUser, deleteUser, editUser };
};
