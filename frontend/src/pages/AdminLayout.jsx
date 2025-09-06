// src/pages/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Component/AdminSidebar";
import AdminHero from "../Component/AdminHero";
import { AdminProvider } from "../context/AdminContext";

const AdminLayout = () => {
  return (
<AdminProvider>
      
    <div className="flex min-h-screen w-full">
      {/* Sidebar (always visible) */}
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        {/* Top hero (always visible) */}
        <AdminHero />

        {/* Dynamic page content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
</AdminProvider>
  );
};

export default AdminLayout;
