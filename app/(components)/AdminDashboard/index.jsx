"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

import CreateUserModal from "./Modals/CreateUser/CreateUserModal";
import DeleteUserModal from "./Modals/DeleteUser/DeleteUserModal";
import EditUserModal from "./Modals/EditUser/EditUserModal";
import PasswordResetModal from "./Modals/PasswordReset/PasswordResetModal";

import { UsersTab } from "./Tabs/UsersTab/UsersTab";

const userDetailsInitalState = {
  firstName: null,
  lastName: null,
  userName: null,
  email: null,
  mobilePhone: null,
};

const AdminDashboard = ({ usersList, rolesList, permissionsList }) => {
  const [activeTab, setActiveTab] = useState("Users");
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState({
    visible: false,
    userDetails: userDetailsInitalState,
  });
  const [showEditUserModal, setShowEditUserModal] = useState({
    visible: false,
    userDetails: userDetailsInitalState,
  });
  const [showDeleteUserModal, setShowDeleteUserModal] = useState({
    visible: false,
    userDetails: userDetailsInitalState,
  });

  return (
    <div className="m-0 p-5 flex flex-col bg-gray-50 h-[850px]">
      <div className="text-center text-4xl"></div>

      <div className="pt-5 flex flex-col flex-grow">
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
          <UsersTab
            usersList={usersList}
            setShowCreateUserModal={setShowCreateUserModal}
            setShowDeleteUserModal={setShowDeleteUserModal}
            setShowEditUserModal={setShowEditUserModal}
            setShowPasswordResetModal={setShowPasswordResetModal}
          />
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

      {showCreateUserModal && (
        <CreateUserModal closeModal={() => setShowCreateUserModal(false)} />
      )}

      {showDeleteUserModal.visible && (
        <DeleteUserModal
          userDetails={showDeleteUserModal.userDetails}
          closeModal={() => setShowDeleteUserModal({ visible: false })}
        />
      )}

      {showEditUserModal.visible && (
        <EditUserModal
          userDetails={showEditUserModal.userDetails}
          closeModal={() => setShowEditUserModal({ visible: false })}
        />
      )}

      {showPasswordResetModal.visible && (
        <PasswordResetModal
          userDetails={showPasswordResetModal.userDetails}
          closeModal={() => setShowPasswordResetModal({ visible: false })}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
