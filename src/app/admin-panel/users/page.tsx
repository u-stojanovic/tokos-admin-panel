"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useUsers } from "@/lib/hooks/user/useUsers";
import UserCard from "./UserCard";
import { User } from "@prisma/client";

export default function Users() {
  const { data: users, isLoading } = useUsers();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (users) {
      setFilteredUsers(users as User[]);
    }
  }, [users]);

  React.useEffect(() => {
    if (users) {
      const result = (users as User[]).filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredUsers(result);
    }
  }, [searchQuery, users]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full px-4 py-6">
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="w-full max-w-md relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/register">
          <Button className="ml-auto">Create User</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UserCard users={filteredUsers} />
      </div>
    </div>
  );
}
