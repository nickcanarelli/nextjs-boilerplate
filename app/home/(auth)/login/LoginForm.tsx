"use client";

import {
  faCircleArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FormWrapper, Password, Textfield } from "@components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@components/core";
// import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "@hooks";
import Link from "next/link";
import * as y from "yup";

const redirectUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_APP_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_APP_URL;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const loginForm = useForm({
    schema,
  });

  const callbackUrl = searchParams?.get("callbackUrl");
  // const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

  const handleLogin: SubmitHandler<FieldValues> = (values) => {
    setIsSubmitting(true);
    const { email, password } = values;

    // signIn("credentials", {
    //   email,
    //   password,
    //   redirect: true,
    //   callbackUrl: callbackUrl ?? redirectUrl,
    // }).then((callback) => {
    //   setIsSubmitting(false);
    //   if (callback?.ok) {
    //     // success, do something with the response
    //     console.log("success");
    //   }
    //   if (callback?.error) {
    //     // do something with the error
    //     console.log("error: ", callback.error);
    //   }
    // });
  };

  return (
    <>
      <FormWrapper
        id="login"
        form={loginForm}
        onSubmit={(values) => handleLogin(values)}
      >
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
          New to [NAME]?{" "}
          <Link
            href="/register"
            className="ml-2 inline-flex cursor-pointer items-center gap-x-2 font-semibold text-accent-primary"
          >
            Sign up for free{" "}
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              aria-hidden="true"
              className="text-sm"
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
  password: y
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(99, "Password must be at most 99 characters")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(
      /^(?=.*[\^$*.[\]{}()?\-“!@#%&/,><`:;|_~`])/,
      "Must contain at least one special character"
    )
    .required("Password is required"),
});
