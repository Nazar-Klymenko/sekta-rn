import { Timestamp } from "firebase/firestore";

import { EventForm } from "@/features/event/models/Event";

import * as yup from "yup";

export const eventSchema: yup.ObjectSchema<EventForm> = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(1, "Title must be at least 1 character"),
  caption: yup
    .string()
    .max(1500, "Caption must not exceed 1500 characters")
    .required("Caption is required"),
  date: yup
    .date()
    .required("Date is required")
    .default(Timestamp.now().toDate()),
  location: yup
    .string()
    .required("Location is required")
    .default("Cracow, Nowa 3"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be at least 0")
    .typeError("Price must be a number")
    .default(20),
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
  image: yup
    .object({
      uri: yup.string().required("Image is required"),
    })
    .required("Image is required"),
});
