"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";

export default function RoleDashboard() {
    const role = usePathname().split("/")[2]?.toUpperCase();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get("token");
                if (!token) throw new Error("No token found");

                // Decode the token to get userId
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                // Fetch user data with userId as a query parameter
                const { data } = await axios.get(`/api/user?userId=${userId}`);
                setUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return null;

    return <h1>Welcome, {user.name} ({role})!</h1>;
}
