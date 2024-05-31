"use client";

import { useFormStatus } from "react-dom";

export const CloseButton = ({ label, handleClick, ...rest }) => {
  return (
    <button className="btn shadow-md" {...rest}>
      {label}
    </button>
  );
};
