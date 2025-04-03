"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import HodDashboard from "@/components/dashboards/HodDashboard";
import FacultyDashboard from "@/components/dashboards/FacultyDashboard";

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

                // Decode token to get userId
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                // Fetch full user details from API
                const { data } = await axios.get(`/api/user?userId=${userId}`);
                
                if (!data || !data.name) throw new Error("User data is incomplete");

                setUser(data); // Now user will include `name`
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

    return (
        <>
            {role === "ADMIN" && <AdminDashboard user={user} />}
            {role === "HOD" && <HodDashboard user={user} />}
            {role === "FACULTY" && <FacultyDashboard user={user} />}
            {!["FACULTY", "HOD", "ADMIN"].includes(role) && <p>Unauthorized Access</p>}
        </>
    );
}
