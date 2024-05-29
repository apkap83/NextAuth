"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = ({ label, loading, isValid, isDirty }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary"
      disabled={!isValid || pending}
      type="submit"
    >
      {pending ? loading : label}
    </button>
  );
};
