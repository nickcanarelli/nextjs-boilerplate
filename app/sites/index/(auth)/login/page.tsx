import { ClientOnly } from "@components/core";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col">
        <div className="text-left text-2xl font-semibold tracking-[-0.464px] text-primary">
          Log in
        </div>
        <p className="text-sm text-secondary">Add some text here?</p>
      </div>

      <ClientOnly>
        <LoginForm />
      </ClientOnly>
    </div>
  );
}
