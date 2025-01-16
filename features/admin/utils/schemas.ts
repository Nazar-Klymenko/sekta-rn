import * as yup from "yup";

import { DEFAULT_DATE, DEFAULT_LOCATION, DEFAULT_PRICE } from "./constants";

export const eventSchema = yup.object().shape({
  image: yup
    .object({
      uri: yup.string().required("Image is required"),
    })
    .required("Image is required"),
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  caption: yup
    .string()
    .max(1500, "Caption must not exceed 1500 characters")
    .required("Caption is required"),

  date: yup.date().required("Date is required").default(DEFAULT_DATE),
  location: yup
    .string()
    .required("Location is required")
    .default(DEFAULT_LOCATION),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be at least 0")
    .typeError("Price must be a number")
    .default(DEFAULT_PRICE),
  genres: yup
    .array()
    .of(yup.string().required("Genre is required"))
    .min(1, "At least one genre is required")
    .defined()
    .default([]),
  lineup: yup
    .array()
    .of(yup.string().required("Artist is required"))
    .min(1, "At least one lineup member is required")
    .defined()
    .default([]),
});

export type EventFormValues = yup.InferType<typeof eventSchema>;

export const residentSchema = yup.object().shape({
  image: yup
    .object({
      uri: yup.string().required("Image is required"),
    })
    .required("Image is required"),
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Name must be at least 1 character"),
  bio: yup
    .string()
    .max(1500, "Caption must not exceed 1500 characters")
    .required("Caption is required"),
});

export type ResidentFormValues = yup.InferType<typeof residentSchema>;
