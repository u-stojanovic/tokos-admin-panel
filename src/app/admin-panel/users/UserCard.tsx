import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";

interface UserCardProps {
  users: User[];
}

export default function UserCard({ users }: UserCardProps) {
  if (!users) {
    return <div>Loading</div>;
  }

  return (
    <>
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="flex items-center gap-4 p-4">
            <UserIcon />
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
