import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema, InferType } from "yup";
import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
} from "react-hook-form";

interface UseFormProps<T extends AnyObjectSchema>
  extends UseHookFormProps<InferType<T>> {
  schema: T;
}

export const useForm = <T extends AnyObjectSchema>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    resolver: yupResolver(schema),
    ...formConfig,
  });
};
