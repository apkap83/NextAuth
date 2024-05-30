import React, { useState, useTransition } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Pagination from "@/(components)/Pagination";
import clsx from "clsx";
import { renderActiveness } from "@/utils/help_func";
import slice from "lodash/slice";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { lockorUnlockUser } from "@/lib/actions";
import toast from "react-hot-toast";

export function UsersTab({
  usersList,
  setShowCreateUserModal,
  setShowDeleteUserModal,
  setShowEditUserModal,
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
                  <div className="flex bg-purple-50 shadow-xl py-2 px-2 gap-2 w-fit">
                    {EditButton({ user, setShowEditUserModal })}
                    {DeleteButton({ user, setShowDeleteUserModal })}
                    {LockOrUnlock({ user })}
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
    </>
  );
}

const EditButton = ({ user, setShowEditUserModal }) => {
  return (
    <button
      className="
      w-6 h-6
    text-blue-400 outline-none border-spacing-2 border shadow-md hover:scale-105"
    >
      <FaPencil
        className={clsx(
          `w-full h-full
          `
        )}
        data-tooltip-id="editIcon"
        onClick={() => {
          setShowEditUserModal({
            visible: true,
            userDetails: {
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.userName,
              email: user.email,
              mobilePhone: user.mobilePhone,
            },
          });
        }}
      />
    </button>
  );
};

const DeleteButton = ({ user, setShowDeleteUserModal }) => {
  return (
    <button className="w-6 h-6 text-red-400 outline-none hover:scale-105 border-spacing-2 border shadow-md">
      <RiDeleteBin5Fill
        className={clsx(`w-full h-full`)}
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
  );
};

const LockOrUnlock = ({ user }) => {
  const [isPending, startTransition] = useTransition();

  const actionLockOrUnlock = () => {
    startTransition(async () => {
      const message = await lockorUnlockUser({
        userName: user.userName,
      });
      if (
        message.status === "SUCCESS_UNLOCKED" ||
        message.status === "SUCCESS_LOCKED"
      ) {
        toast.success(
          <p className="text-center">
            {`User ${user.firstName} ${user.lastName} successfully ${
              message.status === "SUCCESS_UNLOCKED" ? "unlocked" : "locked"
            }`}
          </p>
        );
      } else {
        toast.error(<p className="text-center">{message.message}</p>);
      }
    });
  };

  const UnLock = () => {
    return (
      <FaUnlock
        className={clsx(
          `w-full h-full`,

          { "bg-red-500 border-2": isPending }
        )}
        data-tooltip-id="lockIcon"
        onClick={() => actionLockOrUnlock()}
      />
    );
  };

  const Lock = () => {
    return (
      <FaLock
        className={clsx(
          `w-full h-full`,

          { "bg-green-500 border-2": isPending }
        )}
        data-tooltip-id="lockIcon"
        onClick={() => actionLockOrUnlock()}
      />
    );
  };

  return (
    <button
      className={clsx(
        "w-6 h-6  outline-none hover:scale-105 border-spacing-2 border shadow-md",
        {
          "text-green-400": user.active,
          "text-red-400": !user.active,
        }
      )}
    >
      {user.active ? <UnLock /> : <Lock />}
    </button>
  );
};
