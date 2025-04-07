"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Sidebar Menu */}
                    <Sidebar />

                    {/* Main content */}
                    <div className="layout-page">
                        {/* Navbar placeholder */}
                        <Navbar />

                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                {/* Add your page content here */}
                                <h1>Dashboard Layout Here!</h1>
                                <h4 className="fw-bold py-3 mb-4">Container Layout</h4>
                                <div className="card">
                                    <div className="card-body">Start building your admin dashboard...{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
