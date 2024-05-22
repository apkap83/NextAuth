import { sequelize } from "../index";

const {
  models: { AppUser, AppRole, AppPermission },
} = sequelize;

export const populateDB = async () => {
  await AppUser.findOrCreate({
    where: { username: "akapetan" },
    defaults: {
      firstName: "Apostolos",
      lastName: "Kapetanios",
      userName: "akapetan",
      password: "a12345",
      mobilePhone: "6936092138",
      email: "apostolos.kapetanios@nova.gr",
      active: true,
    },
  });

  await AppUser.findOrCreate({
    where: { username: "ppapadop" },
    defaults: {
      firstName: "Petros",
      lastName: "Papadopoulos",
      userName: "ppapadop",
      password: "a1dasdas!",
      mobilePhone: "6931234567",
      email: "petros.papadopoulos@nova.gr",
      active: true,
    },
  });

  await AppRole.findOrCreate({
    where: { roleName: "Admin" },
    defaults: {
      roleName: "Admin",
      description: "Admin User",
    },
  });

  await AppRole.findOrCreate({
    where: { roleName: "ReadOnlyUser" },
    defaults: {
      roleName: "ReadOnlyUser",
      description: "Read Only User",
    },
  });

  await AppRole.findOrCreate({
    where: { roleName: "AdvancedUser" },
    defaults: {
      roleName: "AdvancedUser",
      description: "Advanced User",
    },
  });

  await AppPermission.findOrCreate({
    where: { permissionName: "Read/Only" },
    defaults: {
      permissionName: "Read/Only",
      description: "Read Only Permission",
    },
  });

  await AppPermission.findOrCreate({
    where: { permissionName: "Read/Write" },
    defaults: {
      permissionName: "Read/Write",
      description: "Read/Write Permission",
    },
  });

  const adminUser = await AppUser.findOne({
    where: {
      userName: "akapetan",
    },
  });

  const adminRole = await AppRole.findOne({
    where: {
      roleName: "Admin",
    },
  });

  const permission = await AppPermission.findOne({
    where: {
      permissionName: "Read/Write",
    },
  });
  // @ts-ignore
  await adminUser.addAppRole(adminRole);

  // @ts-ignore
  await adminRole.addAppPermission(permission);
};
