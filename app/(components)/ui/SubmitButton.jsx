"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = ({ label, loading, isValid }) => {
  const { pending } = useFormStatus();

  const handleClick = (event) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button
      className="btn btn-primary"
      disabled={!isValid || pending}
      type="submit"
      aria-disabled={pending}
      onClick={handleClick}
    >
      {pending ? loading : label}
    </button>
  );
};
