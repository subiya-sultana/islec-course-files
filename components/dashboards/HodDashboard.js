// import HodSidebar from "@/components/sidebars/HodSidebar";

export default function HodDashboard({ user }) {
    return (
        <div className="flex">
            {/* <HodSidebar /> */}
            <div className="p-5">
                <h1>Welcome, {user.name} (HOD)</h1>
                <p>Manage faculty, assign tasks, and oversee the department.</p>
            </div>
        </div>
    );
}
