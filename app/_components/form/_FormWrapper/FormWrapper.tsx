import { ComponentProps } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import clsx from "clsx";

interface FormProps<T extends FieldValues = { [key: string]: any }>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  orientation?: "vertical" | "horizontal";
  gap?: boolean;
}

export default function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  orientation = "vertical",
  gap = true,
  children,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate {...props}>
        <fieldset
          className={clsx("flex min-w-0 flex-1", {
            "flex-col": orientation === "vertical",
            "items-center": orientation !== "vertical",
            "gap-5": gap,
          })}
          // disable form inputs when we are submitting the form!! A tiny detail that is missed a lot of times
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
}
