import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/actions/userActions";

const getAllUsers = async () => {
  const users = await getUsers();
  return users;
};

export const useUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getAllUsers });
};
