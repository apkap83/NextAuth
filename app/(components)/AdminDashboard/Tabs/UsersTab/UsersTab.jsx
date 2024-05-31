import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Pagination from "@/(components)/Pagination";
import { renderActiveness } from "@/utils/help_func";
import slice from "lodash/slice";

import { PasswordChangeButton } from "./Buttons/PasswordChangeButton";
import { EditButton } from "./Buttons/EditButton";
import { DeleteButton } from "./Buttons/DeleteButton";
import { LockOrUnlock } from "./Buttons/LockUnlockButton";

export function UsersTab({
  usersList,
  setShowCreateUserModal,
  setShowDeleteUserModal,
  setShowEditUserModal,
  setShowPasswordResetModal,
}) {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  const paginatedUsersList = slice(
    usersList,
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  return (
    <>
      <div className="border-b h-[623px] overflow-y-auto">
        <table className="table border-b">
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
              <th className="w-[150px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsersList.map((user, index) => (
              <tr
                key={user.userName + index}
                className="hover:bg-slate-100 border-b-2"
              >
                <th>{index + 1 + itemsPerPage * (activePage - 1)}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.mobilePhone}</td>
                <td>{user.AppRoles.map((role) => role.roleName).join(", ")}</td>
                <td>{renderActiveness(user.active)}</td>
                <td>
                  <div className="flex bg-purple-50 shadow-xl py-2 px-2 gap-3 w-fit">
                    {LockOrUnlock({ user })}
                    {EditButton({ user, setShowEditUserModal })}
                    {PasswordChangeButton({ user, setShowPasswordResetModal })}
                    {DeleteButton({ user, setShowDeleteUserModal })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <div className="pt-5 flex justify-between items-center">
        <div className="py-5 flex gap-1 ">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setShowCreateUserModal(true);
            }}
          >
            Create User
          </button>
        </div>
        <Pagination
          totalItems={usersList?.length || 0}
          pageSize={itemsPerPage}
          activePage={activePage}
          onPageChange={(page) => setActivePage(page)}
        />
      </div>
      <ReactTooltip id="editIcon" place="bottom" content="Edit User" />
      <ReactTooltip id="deleteIcon" place="bottom" content="Delete User" />
      <ReactTooltip id="lockIcon" place="bottom" content="Lock/Unlock User" />
      <ReactTooltip
        id="passwordChangeIcon"
        place="bottom"
        content="Password reset"
      />
    </>
  );
}
