// import HodSidebar from "@/components/sidebars/HodSidebar";

export default function AdminDashboard({ user }) {
    return (
        <div className="flex">
            {/* <HodSidebar /> */}
            <div className="p-5">
                <h1>Welcome, {user.name} (ADMIN)</h1>
                <p>Manage faculty, hod, departments assign roles, and oversee everything</p>
            </div>
        </div>
    );
}
