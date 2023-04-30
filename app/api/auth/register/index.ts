import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation(
    async (request: { email: string; password: string; role?: string }) => {
      const { email, password, role } = request;

      const response = await axios.post("/api/auth/register", {
        email,
        password,
        role,
      });

      return response;
    }
  );
};
