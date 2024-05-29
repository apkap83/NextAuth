import { sequelize } from "@/(db)";

export const getAdminData = async () => {
  const { AppUser, AppRole, AppPermission } = sequelize.models;

  const usersList = await AppUser.findAll({ include: AppRole });
  const rolesList = await AppRole.findAll();
  const permissionsList = await AppPermission.findAll();

  // Convert models to plain objects
  const plainUsersList = usersList.map((user) => user.toJSON());
  const plainRolesList = rolesList.map((role) => role.toJSON());
  const plainPermissionsList = permissionsList.map((permission) =>
    permission.toJSON()
  );

  return {
    usersList: plainUsersList,
    rolesList: plainRolesList,
    permissionsList: plainPermissionsList,
  };
};
