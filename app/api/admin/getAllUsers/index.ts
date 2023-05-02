import { useQuery } from "@tanstack/react-query";

export async function getAllUsers() {
  const res = await fetch("/api/admin/getAllUsers");
  return await res.json();
}

export const useGetAllUsers = () => {
  return useQuery(["getAllUsers"], getAllUsers);
};
