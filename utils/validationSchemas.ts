// src/utils/validationSchemas.ts
import * as yup from "yup";

export const emailSchema = yup
  .string()
  .required("Email is required")
  .email("Invalid email")
  .trim();

export const usernameSchema = yup
  .string()
  .required("Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be 20 characters at most")
  .lowercase()
  .trim();

export const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  );
