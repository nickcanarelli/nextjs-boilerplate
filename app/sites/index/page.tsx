import getCurrentServerSession from "@actions/getCurrentServerSession";
import { LoginButton, LogoutButton } from "./idk";
import { ClientOnly } from "@components/core";

export default async function HomeIndex() {
  const session = await getCurrentServerSession();

  return (
    <div className="text-[80px] font-bold text-primary">
      Home Index
      <ClientOnly>
        <LoginButton />
        <LogoutButton />
      </ClientOnly>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
