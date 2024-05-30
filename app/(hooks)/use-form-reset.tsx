import { useRef, useEffect } from "react";
import { FormState } from "@/utils/to-form-state";

const useFormReset = (formState: FormState, closeModal, formik) => {
  const formRef = useRef<HTMLFormElement>(null);
  const prevTimestamp = useRef(formState.timestamp);

  useEffect(() => {
    formik.resetForm();
    console.log("formik", formik);
    if (!formRef.current) return;

    if (
      formState.status === "SUCCESS" &&
      formState.timestamp !== prevTimestamp.current
    ) {
      formRef.current.reset();
      prevTimestamp.current = formState.timestamp;
      formik.resetForm();
      // closeModal();
    }
  }, [formState.status, formState.timestamp]);

  return formRef;
};

export { useFormReset };
