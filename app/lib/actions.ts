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

const { AppUser, AppRole, AppPermission } = sequelize.models;

export async function createUser(formState, formData) {
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

const userSchema_updateUser = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobilePhone: yup.string().required("Mobile phone is required"),
});

export async function lockorUnlockUser({ userName }) {
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    // Check if the user already exists
    const user = await AppUser.findOne({ where: { userName } });
    if (!user)
      throw new Error(`User with user name ${userName} was not found!`);

    //@ts-ignore
    user.active = !user.active;
    user.save();

    revalidatePath("/Admin");
    return {
      //@ts-ignore
      status: `${user.active ? "SUCCESS_UNLOCKED" : "SUCCESS_LOCKED"}`,
      // @ts-ignore
      message: `User ${userName} is now ${user.active ? "unlocked" : "locked"}`,
    };
  } catch (error) {
    return { status: "ERROR", message: error.message };
  }
}

export async function editUser(formState, formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const userName = formData.get("userName");
  const email = formData.get("email");
  const mobilePhone = formData.get("mobilePhone");

  const userData = {
    firstName,
    lastName,
    userName,
    email,
    mobilePhone,
  };

  await new Promise((resolve) => setTimeout(resolve, 250));

  // Validate input data with yup
  try {
    await userSchema_updateUser.validate(userData, { abortEarly: false });

    // Check if the user already exists
    const user = await AppUser.findOne({ where: { userName } });

    if (!user)
      throw new Error(`User with user name ${userName} was not found!`);

    // @ts-ignore
    user.firstName = firstName;
    // @ts-ignore
    user.lastName = lastName;
    // @ts-ignore
    user.email = email;
    // @ts-ignore
    user.mobilePhone = mobilePhone;

    await user.save();

    revalidatePath("/Admin");
    return toFormState("SUCCESS", "User Updated!");
  } catch (error) {
    return fromErrorToFormState(error);
  }
}
