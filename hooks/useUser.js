import React, { useCallback, useState } from "react";

// import useCollection from "./firebase/useCollection";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: "AXPX8yVe8wcpQ6PncjF6594YY342",
      email: "masaabgul086@gmail.com",
      name: "Masaab",
      role: "Admin",
      permissions: ["viewing_dashboard"],
    },
    {
      id: "St51qWy7qFQoGK03gpMUMsAFgHH3",
      email: "customer@gmail.com",
      name: "Customer",
      role: "Customer",
      permissions: ["viewing_dashboard"],
    },
    {
      id: "Y9DygBWFrLf7dR8pQxI4fCck9GS2",
      email: "vendor@gmail.com",
      name: "Vendor",
      role: "Vendor",
      permissions: ["viewing_dashboard"],
    },
    {
      id: "hNtitXy6DvfO41xmbq2i0YbhqwM2",
      email: "dealer@gmail.com",
      name: "Dealer",
      role: "Dealer",
      permissions: ["viewing_dashboard"],
    },
  ]);

  //   const { data } = useCollection("users");

  const createUser = useCallback((data) => {
    // Saving data  and creating user
  }, []);
  const updateUser = useCallback((id, data) => {
    // Savaing data and updating user
  }, []);

  const getAllUsers = useCallback(async () => {
    // Getting all users here
    // setUsers(data);
  }, []);

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
