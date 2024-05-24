import { NextResponse } from "next/server";
import { sequelize } from "../../(db)";
import * as yup from "yup";
import { revalidatePath } from "next/cache";

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

async function handleSequelizeErrors(error) {
  if (error.name === "SequelizeValidationError") {
    return NextResponse.json(
      {
        message: error.errors.map((e) => e.message).join(", "),
      },
      { status: 400 }
    );
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return NextResponse.json(
      {
        message: error.errors.map((e) => e.message).join(", "),
      },
      { status: 409 }
    );
  }

  return NextResponse.json(
    { message: "An unexpected error occurred", error: error.message },
    { status: 500 }
  );
}

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

    // // Check for duplicate email
    // const duplicate = await AppUser.findOne({
    //   where: { email: email },
    // });

    // if (duplicate) {
    //   return NextResponse.json({ message: " Email" }, { status: 409 });
    // }

    // Create and save the new user
    const newUser = await AppUser.create({
      firstName,
      lastName,
      userName,
      password,
      email,
      mobilePhone,
    });

    // Revalidate the path
    await revalidatePath("/dashboard/invoices");

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.log("BackEnd Error: ", JSON.stringify(error, null, 2));
    return handleSequelizeErrors(error);
  }
}
