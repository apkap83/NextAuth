"use client";

import React, { useState } from "react";
import CreateUserModal from "./CreateUserModal";

const AdminDashboard = ({ usersList, rolesList, permissionsList }) => {
  const [activeTab, setActiveTab] = useState("Users");
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const openModal = () => {
    setShowCreateUserModal(true);
  };

  const closeModal = () => {
    setShowCreateUserModal(false);
  };

  const renderActiveness = (active) => {
    return active ? (
      <span className="bg-green-400 p-2 rounded-lg text-white">Active</span>
    ) : (
      <span className="bg-red-400 p-2 rounded-full text-white">Inactive</span>
    );
  };

  return (
    <div className="m-0 p-5 flex-grow flex flex-col bg-teal-50">
      <div className="text-center text-4xl">Admin Dashboard</div>

      <div className="flex-grow pt-5">
        <div className="border-b">
          <div
            role="tablist"
            className="w-80 tabs tabs-lifted tabs-lg w-50 mb-[-1px]"
          >
            <a
              role="tab"
              className={`tab ${activeTab === "Users" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Users")}
            >
              Users
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === "Roles" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("Roles")}
            >
              Roles
            </a>
            <a
              role="tab"
              className={`tab ${
                activeTab === "Permissions" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("Permissions")}
            >
              Permissions
            </a>
          </div>
        </div>

        {activeTab === "Users" && (
          <table className="table table-s">
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Name</th>
                <th>E-mail</th>
                <th>Mobile Phone</th>
                <th>Role</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr key={user.userName + index}>
                  <th>{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobilePhone}</td>
                  <td>
                    {user.AppRoles.map((role) => role.roleName).join(", ")}
                  </td>
                  <td>{renderActiveness(user.active)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        )}

        {activeTab === "Roles" && (
          <div>
            {/* Render roles content */}
            <table className="table table-s">
              <thead>
                <tr>
                  <th></th>
                  <th>Role Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {rolesList.map((role, index) => (
                  <tr key={index + role}>
                    <th>{index + 1}</th>
                    <td>{role.roleName}</td>
                    <td>{role.description}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        )}

        {activeTab === "Permissions" && (
          <div>
            <table className="table table-s">
              <thead>
                <tr>
                  <th></th>
                  <th>Permission Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {permissionsList.map((permission, index) => (
                  <tr key={index + permission}>
                    <th>{index + 1}</th>
                    <td>{permission.permissionName}</td>
                    <td>{permission.description}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        )}
      </div>
      <div className="py-2 flex gap-2 ">
        <button className="btn btn-primary btn-sm" onClick={openModal}>
          Create User
        </button>
        <button className="btn btn-secondary btn-sm">Delete User</button>
      </div>

      {showCreateUserModal && <CreateUserModal closeModal={closeModal} />}
    </div>
  );
};

export default AdminDashboard;
