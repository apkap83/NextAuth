import { Sequelize, DataTypes } from "sequelize";

export const AppPermission = (sequelize: Sequelize) => {
  sequelize.define("AppPermission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permissionName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
};
