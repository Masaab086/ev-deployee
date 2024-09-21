import React, { useCallback, useEffect, useState } from "react";

import useCollection from "./firebase/useCollection";
import useRegister from "./firebase/useRegister";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const { registerUser } = useRegister();
  const { getDocuments } = useCollection("users");

  const createUser = useCallback(async (data) => {
    // Saving data  and creating user
    await registerUser(data);
  }, []);
  const updateUser = useCallback((id, data) => {
    // Savaing data and updating user
  }, []);

  const getAllUsers = useCallback(async () => {
    // Getting all users here
    const users = await getDocuments();
    setUsers(users);
    console.log(users);
  }, [users]);

  const getUserById = useCallback((id) => {
    // Getting a user by id
  }, []);

  const deleteUserById = useCallback((id) => {
    // Deleting user by id
  }, []);
  return {
    user,
    users,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUserById,
  };
};

export default useUser;
