import getCurrentSession from "./getCurrentServerSession";
import { prisma } from "@helpers/prisma";

export default async function getCurrentUser() {
  //   try {
  //     const session = await getCurrentSession();
  //     if (!session?.user?.email) return null;
  //     const currentUser = await prisma.user.findUnique({
  //       where: { email: session.user.email },
  //     });
  //     if (!currentUser) return null;
  //     return currentUser;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
}
