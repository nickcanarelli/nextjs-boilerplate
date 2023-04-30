import { useSession } from "next-auth/react";

export const useGetCurrentClientSession = () => {
  return useSession();
};
