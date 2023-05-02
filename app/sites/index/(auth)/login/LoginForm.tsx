"use client";

import {
  faCircleArrowRight,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FormWrapper, Password, Textfield } from "@components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Transition } from "@headlessui/react";
import { ENV_URLS } from "@lib/constants";
import { Button } from "@components/core";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "@hooks";
import Link from "next/link";
import * as y from "yup";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams?.get("callbackUrl");
  const email = searchParams?.get("email");

  const loginForm = useForm({
    schema,
    defaultValues: {
      email: email ?? "",
    },
  });

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = loginForm;

  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    setIsSubmitting(true);
    const { email, password } = values;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((res) => {
      setIsSubmitting(false);
      if (!res?.error) {
        // success, do something with the response
        router.push(callbackUrl ? callbackUrl : ENV_URLS.app);
      }
      if (res?.error === "CredentialsSignin") {
        setError("invalidCredentials", {
          type: "custom",
          message:
            "Invalid credentials. Please try again or reset your password.",
        });
      }
    });
  };

  return (
    <>
      <FormWrapper
        id="login"
        form={loginForm}
        onSubmit={(values) => handleLogin(values)}
      >
        <Transition
          show={errors?.invalidCredentials ? true : false}
          enter="transition ease duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="relative rounded-lg bg-red-alpha-200 p-3">
            <div className="flex flex-row">
              <FontAwesomeIcon
                icon={faCircleXmark}
                aria-hidden="true"
                className="mr-3 mt-0.5 text-error-primary"
              />
              <div className="flex flex-col text-sm text-error-contrast">
                <div className="font-semibold">Error</div>

                <div className="font-normal opacity-60">
                  {errors?.invalidCredentials?.message}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                aria-hidden="true"
                className="absolute right-3 top-3 text-error-primary text-sm cursor-pointer"
                onClick={() => clearErrors("invalidCredentials")}
              />
            </div>
          </div>
        </Transition>
        <input name="invalidCredentials" type="hidden" />
        <Textfield id="email" label="Email" required />
        <Password id="password" label="Password" icon />
      </FormWrapper>
      <div className="flex flex-col gap-y-4">
        <Button
          group="normal"
          variant="primary"
          size="md"
          width="full"
          form="login"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin"
              aria-hidden="true"
            />
          ) : null}
          {isSubmitting ? "Logging in" : "Continue"}
        </Button>

        <div className="text-center text-sm font-medium text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="ml-2 inline-flex cursor-pointer items-center gap-x-2 font-semibold text-accent-primary group"
          >
            Sign up for free{" "}
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              aria-hidden="true"
              className="text-sm group-hover:animate-bounce-h"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

const schema = y.object({
  email: y
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: y.string().required("Password is required"),
  invalidCredentials: y.string().notRequired(),
});
