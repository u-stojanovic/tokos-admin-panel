import { useQuery } from "@tanstack/react-query";
import { getUserAndRole } from "@/lib/auth/authUtils";

const fetchUser = async () => {
  const { user } = await getUserAndRole();
  return user;
};

export const useUserAndRole = () => {
  return useQuery({ queryKey: ["userAndRole"], queryFn: fetchUser });
};
