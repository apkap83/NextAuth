import { NextResponse } from "next/server";
import { sequelize } from "../../(db)";
import bcrypt from "bcrypt";

import * as yup from "yup";
import { AppUser } from "../../(db)/models/User";
import { AppPermission } from "../../(db)/models/Permission";

export const userSchema = yup.object().shape({
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

export async function POST(req) {
  const { AppUser, AppRole, AppPermission } = sequelize.models;
  try {
    const body = await req.json();
    const userData = body;

    // Validate input data with yup
    try {
      await userSchema.validate(userData, { abortEarly: false });
    } catch (validationError) {
      return NextResponse.json(
        { message: "Validation Error", errors: validationError.errors },
        { status: 400 }
      );
    }

    const { firstName, lastName, userName, password, email, mobilePhone } =
      userData;

    // Check for duplicate email
    console.log("*** userData.email ", userData.email);
    const duplicate = await AppUser.findOne({
      where: { email: email },
    });

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    // Create and save the new user
    const newUser = AppUser.create({
      firstName,
      lastName,
      userName,
      password,
      email,
      mobilePhone,
    });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
