import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/utils/validationSchemas";

import * as yup from "yup";

export const usernameBridgeSchema = yup.object().shape({
  username: usernameSchema,
});

export type UsernameBridgeSchemaType = yup.InferType<
  typeof usernameBridgeSchema
>;

export const signUpSchema = yup.object().shape({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  agreeTos: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions")
    .default(false),
  agreeEmail: yup.boolean().optional().default(false),
});

export type SignUpSchemaType = yup.InferType<typeof signUpSchema>;

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required("Password is required").default(""),
});
export type LoginSchemaType = yup.InferType<typeof loginSchema>;

export const forgotPasswordSchema = yup.object().shape({
  email: emailSchema,
});

export type ForgotPasswordSchemaType = yup.InferType<
  typeof forgotPasswordSchema
>;
