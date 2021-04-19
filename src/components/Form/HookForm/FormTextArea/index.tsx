import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { FieldError } from "react-hook-form";

import styles from "./FormTextArea.module.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  name: string;
  round?: boolean;
  label?: string;
  error?: FieldError | undefined;
  wrapperStyles?: string;
}

function FormTextArea({
  id,
  type = "text",
  name,
  label,
  error,
  register,
  className,
  wrapperStyles,
  round,
  ...props
}: FormInputProps) {
  return (
    <div
      className={classNames(
        styles.InputWrapper,
        wrapperStyles,
        {
          [styles.hasError]: !!error?.message,
        },
        {
          [styles.round]: round,
        }
      )}
    >
      {!!label && (
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        type={type}
        className={classNames(styles.Input, className)}
        {...register(name)}
        {...props}
      />
      {error?.message && <span className={styles.Error}>{error.message}</span>}
    </div>
  );
}

export default FormTextArea;
