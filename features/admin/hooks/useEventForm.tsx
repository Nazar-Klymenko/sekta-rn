import { Timestamp } from "firebase/firestore";

import { Event, EventFormData } from "@/features/event/models/Event";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const DEFAULT_PRICE = 20;
const DEFAULT_LOCATION = "Cracow, Nowa 3";
const DEFAULT_DATE = Timestamp.now().toDate();

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

export function useEventForm() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      price: DEFAULT_PRICE,
      location: DEFAULT_LOCATION,
      date: DEFAULT_DATE,
    },
  });

  return { control, handleSubmit, reset, setValue, errors };
}
