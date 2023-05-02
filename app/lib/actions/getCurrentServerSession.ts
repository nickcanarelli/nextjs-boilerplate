import { authOptions } from "@api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function getCurrentServerSession() {
  const session = await getServerSession(authOptions);
  return session;
}
