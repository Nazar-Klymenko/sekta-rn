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
    .required("Price is required")
    .min(0, "Price must be at least 0")
    .typeError("Price must be a number"),
  genres: yup
    .array()
    .of(yup.string().required("Genre is required"))
    .min(1, "At least one genre is required")
    .defined(),
  lineup: yup
    .array()
    .of(yup.string().required("Artist is required"))
    .min(1, "At least one lineup member is required")
    .defined(),
});
export type FormValues = yup.InferType<typeof eventSchema>;
