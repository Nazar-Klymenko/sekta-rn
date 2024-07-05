import React from "react";
import { View } from "react-native";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { Button } from "tamagui";

type FormProps<T extends FieldValues> = {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  children,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <View>
        {children}
        <SubmitButton onSubmit={onSubmit} />
      </View>
    </FormProvider>
  );
}

function SubmitButton<T extends FieldValues>({
  onSubmit,
}: {
  onSubmit: SubmitHandler<T>;
}) {
  const { handleSubmit } = useFormContext<T>();
  return <Button onPress={handleSubmit(onSubmit)}>Submit</Button>;
}
