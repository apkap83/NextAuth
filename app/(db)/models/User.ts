import { Sequelize, Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  mobilePhone: string;
  email: string;
  active: boolean;
}

export const AppUser = (sequelize: Sequelize) => {
  sequelize.define<Model<UserAttributes>>(
    "AppUser",
    {
      // Explicitly define the id column
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(65),
      },
      mobilePhone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ["password"],
            // Optionally, you can exclude other fields if needed
            // exclude: ['someOtherField']
          },
        },
      },
      hooks: {
        beforeCreate: async (user) => {
          if (user.getDataValue("password")) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(
              user.getDataValue("password"),
              salt
            );
            user.setDataValue("password", hashedPassword);
          }
        },

        // TODO: Error: Lock wait timeout exceeded; try restarting transaction
        // afterCreate: async (user: Model<UserAttributes>) => {
        //   await logAudit(
        //     AuditActionTypes.CREATE_USER,
        //     `User create with ID ${user.dataValues.id}`,
        //     user.dataValues.id
        //   );
        // },
      },
    }
  );
};
