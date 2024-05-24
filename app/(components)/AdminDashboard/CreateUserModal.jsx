import React, { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios"; // Import axios for making API requests
import { faker } from "@faker-js/faker";

import { FaMobileRetro } from "react-icons/fa6";
import { CgNametag } from "react-icons/cg";
import { FaKey } from "react-icons/fa";

function CreateUserModal({ closeModal }) {
  const [error, setError] = useState(null); // State variable to hold error message

  const handleSubmissionError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      setError(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      setError(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      setError("Error", error.message);
    }
    console.log(error.config);
  };

  const formik = useFormik({
    initialValues: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      mobilePhone: faker.phone.number(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Send POST request to server endpoint
        const response = await axios.post("/api/Users", values);

        // if (response.status === 201) {
        //   router.push("/dashboard/invoices");
        // } else {
        //   console.error("Error:", response.data.message);
        // }

        // Handle success response
        console.log("User created successfully:", response.data);
        closeModal(); // Close modal after successful creation
      } catch (error) {
        return handleSubmissionError(error);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-8 py-3 rounded-lg">
        <h3 className="font-bold text-lg text-center">Create User Form</h3>

        <form
          className="flex flex-col gap-3 pt-3"
          onSubmit={formik.handleSubmit}
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="First Name"
            />
          </label>

          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="Last Name"
            />
          </label>
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <CgNametag className="w-4 h-4 opacity-70" />
            <input
              type="text"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="User Name"
            />
          </label>
          {formik.touched.userName && formik.errors.userName ? (
            <p className="text-red-500 text-sm">{formik.errors.userName}</p>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <FaKey className="w-4 h-4 opacity-70" />
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="Password"
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="Email"
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <FaMobileRetro className="w-4 h-4 opacity-70" />

            <input
              type="text"
              name="mobilePhone"
              value={formik.values.mobilePhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="Mobile Phone"
            />
          </label>

          {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
            <p className="text-red-500 text-sm">{formik.errors.mobilePhone}</p>
          ) : null}

          {/* Render error message */}
          {error ? (
            <div className="mt-2 mb-1 text-red-500 text-sm">Error: {error}</div>
          ) : (
            <div></div>
          )}
          <div className="mt-5 flex justify-around">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn btn-" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("User name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobilePhone: Yup.string()
    // .matches(/^\d{10}$/, "Mobile phone must be 10 digits")
    .required("Mobile phone is required"),
});

export default CreateUserModal;
