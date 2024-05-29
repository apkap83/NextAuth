import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Pagination from "@/(components)/Pagination";
import clsx from "clsx";
import { renderActiveness } from "@/utils/help_func";
import slice from "lodash/slice";

export function UsersTab({
  usersList,
  setShowCreateUserModal,
  setShowDeleteUserModal,
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsersList.map((user, index) => (
              <tr key={user.userName + index}>
                <th>{index + 1 + itemsPerPage * (activePage - 1)}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.mobilePhone}</td>
                <td>{user.AppRoles.map((role) => role.roleName).join(", ")}</td>
                <td>{renderActiveness(user.active)}</td>
                <td>
                  <button className="w-7 h-7">
                    <RiDeleteBin5Fill
                      className={clsx(
                        `w-full h-full  text-slate-700 outline-none hover:bg-slate-200`
                      )}
                      data-tooltip-id="deleteIcon"
                      onClick={() => {
                        setShowDeleteUserModal({
                          visible: true,
                          userDetails: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                          },
                        });
                      }}
                    />
                  </button>
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
      <ReactTooltip id="deleteIcon" place="bottom" content="Delete User" />
    </>
  );
}
