import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormState } from "react-dom";
import { useFormik } from "formik";
import { FieldError } from "../CreateUser/field-error";
import { CgNametag } from "react-icons/cg";
import { useToastMessage } from "../../../../(hooks)/use-toast-message";
import { EMPTY_FORM_STATE } from "@/utils/to-form-state";
import { SubmitButton } from "@/(components)/ui/SubmitButton";
import { editUser } from "@/lib/actions";
import { FormStateError } from "../CreateUser/form-state-error";
import { FaMobileRetro } from "react-icons/fa6";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("User name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobilePhone: Yup.string()
    // .matches(/^\d{10}$/, "Mobile phone must be 10 digits")
    .required("Mobile phone is required"),
});

const EditUserModal = ({ userDetails, closeModal }) => {
  const [formState, action] = useFormState(editUser, EMPTY_FORM_STATE);

  const noScriptFallback = useToastMessage(formState);

  const formik = useFormik({
    initialValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      userName: userDetails.userName,
      email: userDetails.email,
      mobilePhone: userDetails.mobilePhone,
    },
    validationSchema: validationSchema,
    // onSubmit: async (values, { setSubmitting }) => {},
  });

  useEffect(() => {
    if (formState.status === "SUCCESS") closeModal();
  }, [formState.status, formState.timestamp]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-8 py-3 border-[1px] border-blue-900 shadow-2xl rounded-lg">
        <h3 className="font-bold text-lg text-center">Edit User Form</h3>

        <form className="flex flex-col gap-3 pt-3" action={action}>
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
              autoFocus
            />
          </label>
          <FieldError formik={formik} name="firstName" />

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
          <FieldError formik={formik} name="lastName" />

          <label className="input input-bordered flex items-center gap-2 text-gray-400">
            <CgNametag className="w-4 h-4 opacity-70" />
            <input
              type="text"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="grow"
              placeholder="User Name"
              readOnly
            />
          </label>
          <FieldError formik={formik} name="userName" />

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
          <FieldError formik={formik} name="email" />

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

          <FieldError formik={formik} name="mobilePhone" />

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <FormStateError formState={formState} />
          </div>
          <div className="mt-5 flex justify-around">
            <SubmitButton
              label="Update"
              loading="Updating ..."
              isValid={formik.isValid}
              isDirty={formik.dirty}
            />

            <button className="btn btn-" onClick={closeModal}>
              Close
            </button>

            {noScriptFallback}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
