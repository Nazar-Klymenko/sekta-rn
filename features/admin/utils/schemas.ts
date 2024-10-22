import * as yup from "yup";

export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  caption: yup
    .string()
    .max(1500, "Caption must not exceed 1500 characters")
    .required("Caption is required"),

  date: yup.date().required("Date is required"),
  location: yup.string().required("Location is required"),

  price: yup
    .number()
    .min(0, "Price must be non-negative")
    .required("Price is required"),

  genres: yup.array().of(yup.string().required()).defined(),
  lineup: yup.array().of(yup.string().required()).defined(),
});
export type FormValues = yup.InferType<typeof eventSchema>;
