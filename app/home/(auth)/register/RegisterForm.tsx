"use client";

import { FormWrapper, Password, Textfield } from "@components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRegister } from "@api/auth/register";
import { Button } from "@components/core";
import { useForm } from "@hooks";
import Link from "next/link";
import * as y from "yup";
import {
  faCircleArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function RegisterForm() {
  const { mutateAsync: register, isLoading: isRegistering } = useRegister();
  const registerForm = useForm({
    schema,
  });

  const handleRegister: SubmitHandler<FieldValues> = async (values) => {
    const { email, password } = values;
    await register({ email, password });
  };

  return (
    <>
      <FormWrapper
        id="register"
        form={registerForm}
        onSubmit={(values) => handleRegister(values)}
      >
        <Textfield id="username" label="Username" required />
        <Textfield id="email" label="Email Address" required />
        <Password id="password" label="Password" icon showStrength />
      </FormWrapper>
      <div className="flex flex-col gap-y-4">
        <Button
          group="normal"
          variant="primary"
          size="md"
          width="full"
          form="register"
          type="submit"
          disabled={isRegistering}
        >
          {isRegistering ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin"
              aria-hidden="true"
            />
          ) : null}
          {isRegistering ? "Creating Account" : "Create Account"}
        </Button>

        {/* <Divider text='or continue with' />
    
        <Button
          group='normal'
          variant='twitch'
          size='md'
          width='full'
          form='register'
          type='submit'
        >
          <FontAwesomeIcon icon={faTwitch} aria-hidden='true' className='h-4 w-4' />
          Twitch
        </Button>
      
        <Button
          group='normal'
          variant='riot'
          size='md'
          width='full'
          form='register'
          type='submit'
        >
          <RiotLogo className='fill-accent-contrast' width='16' height='16' />
          Riot Games
        </Button> 
        
        */}

        <div className=" text-center text-sm font-medium text-secondary">
          Have an account?{" "}
          <Link
            href="/login"
            className="ml-2 inline-flex cursor-pointer items-center gap-x-2 font-semibold text-accent-primary"
          >
            Log in{" "}
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
  username: y.string().required("Username is required"),
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
