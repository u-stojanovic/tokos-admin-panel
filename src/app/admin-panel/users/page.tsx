import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default async function Users() {
  return (
    <div className="flex flex-col w-full px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="w-full max-w-md relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-10"
          />
        </div>
        <Link href="/register">
          <Button className="ml-auto">Create User</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <UserIcon />
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold">User Name</h3>
              <p className="text-sm text-gray-500">Role</p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
