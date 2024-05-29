"use server";

import * as yup from "yup";
import { sequelize } from "../(db)";
import { revalidatePath } from "next/cache";
import { fromErrorToFormState, toFormState } from "@/utils/to-form-state";

const userSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobilePhone: yup.string().required("Mobile phone is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export async function createUser(formState, formData) {
  const { AppUser, AppRole, AppPermission } = sequelize.models;

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const userName = formData.get("userName");
  const password = formData.get("password");
  const email = formData.get("email");
  const mobilePhone = formData.get("mobilePhone");

  const userData = {
    firstName,
    lastName,
    userName,
    password,
    email,
    mobilePhone,
  };

  await new Promise((resolve) => setTimeout(resolve, 250));

  // Validate input data with yup
  try {
    await userSchema.validate(userData, { abortEarly: false });

    // Check if the user already exists (optional step)
    const existingEmail = await AppUser.findOne({ where: { email } });
    const existingUserName = await AppUser.findOne({ where: { userName } });
    const existingMobilePhone = await AppUser.findOne({
      where: { mobilePhone },
    });

    if (existingEmail) throw new Error("User with this email already exists.");
    if (existingUserName)
      throw new Error("User with this user name already exists.");
    if (existingMobilePhone)
      throw new Error("User with this mobile phone already exists.");

    //   // Create and save the new user
    const newUser = await AppUser.create({
      firstName,
      lastName,
      userName,
      password,
      email,
      mobilePhone,
    });

    revalidatePath("/Admin");
    return toFormState("SUCCESS", "User Created!");
  } catch (error) {
    return fromErrorToFormState(error);
  }
}

export async function deleteUser({ userName }) {
  const { AppUser, AppRole, AppPermission } = sequelize.models;

  await new Promise((resolve) => setTimeout(resolve, 250));

  // Validate input data with yup
  try {
    //  Delete User
    const deletedCount = await AppUser.destroy({
      where: {
        userName,
      },
    });

    revalidatePath("/Admin");

    if (deletedCount === 0) {
      return { status: "ERROR", message: "User was not found!" };
    }

    return { status: "SUCCESS", message: "User Deleted!" };
  } catch (error) {
    return { status: "ERROR", message: error.message };
  }
}
