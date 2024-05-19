import { Sequelize } from "sequelize-typescript";

import { AppUser } from "./models/User";
import { AppRole } from "./models/Role";
import { AppPermission } from "./models/Permission";
import { Audit } from "./models/Audit";

// const sequelize = new Sequelize("Sequelize_Example_DB", "root", "nsm055!3", {
const sequelize = new Sequelize({
  host: "127.0.0.1",
  username: "root",
  password: "nsm055!3",
  database: "Sequelize_Example_DB",
  dialect: "mysql",

  // REMEMBER This is required in NextJS environment - Please install mysql2 package manually problem
  dialectModule: require("mysql2"),
  dialectOptions: {
    charset: "utf8",
  },
  define: {
    freezeTableName: true,
    timestamps: true,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // disable logging; default: console.log
  // logging: false,
});

const modelDefiners = [AppUser, AppRole, AppPermission, Audit];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

const applyAssociations = async () => {
  const { AppUser, AppRole, AppPermission, Audit } = sequelize.models;

  AppUser.belongsToMany(AppRole, { through: "_userRole", timestamps: false });
  AppRole.belongsToMany(AppUser, { through: "_userRole", timestamps: false });

  AppRole.belongsToMany(AppPermission, {
    through: "_rolePermission",
    timestamps: false,
  });
  AppPermission.belongsToMany(AppRole, {
    through: "_rolePermission",
    timestamps: false,
  });

  Audit.belongsTo(AppUser, { foreignKey: "userId" });
  Audit.belongsTo(AppRole, { foreignKey: "roleId" });
  Audit.belongsTo(AppPermission, { foreignKey: "permissionId" });
};

applyAssociations();

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing the database", error);
  }
};

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    sequelize.close();
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};

export { sequelize, syncDatabase };
