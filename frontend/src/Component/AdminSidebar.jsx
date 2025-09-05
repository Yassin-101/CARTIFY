// src/Component/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white border-r p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Maketmasta</h2>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block px-2 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "font-bold text-blue-600" : "text-gray-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `block px-2 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "font-bold text-blue-600" : "text-gray-700"
                }`
              }
            >
              Product Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `block px-2 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "font-bold text-blue-600" : "text-gray-700"
                }`
              }
            >
              Order Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block px-2 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "font-bold text-blue-600" : "text-gray-700"
                }`
              }
            >
              User Management
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* bottom settings */}
      <div className="mt-auto pt-6 border-t">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `block px-2 py-2 rounded hover:bg-gray-100 ${
              isActive ? "font-bold text-blue-600" : "text-gray-700"
            }`
          }
        >
          Settings
        </NavLink>
        <button className="mt-3 w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
