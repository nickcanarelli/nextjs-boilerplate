import { ClientOnly } from "@components/core";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col">
        <div className="text-left text-2xl font-semibold tracking-[-0.464px] text-primary">
          Create your account
        </div>
        <p className="text-sm text-secondary">
          Signing up for [NAME] is fast and 100% free, no credit card required.
        </p>
      </div>

      <ClientOnly>
        <RegisterForm />
      </ClientOnly>
    </div>
  );
}
