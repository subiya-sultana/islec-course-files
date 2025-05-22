"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ named import for v4

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");

        const decoded = jwtDecode(token); 
        const userId = decoded.id || decoded._id;

        if (!userId) throw new Error("User ID not found in token");

        const { data } = await axios.get(`/api/user?userId=${userId}`);
        setUser(data);
      } catch (err) {
        console.error("Error loading user info:", err.message || err);
        setError(err.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
