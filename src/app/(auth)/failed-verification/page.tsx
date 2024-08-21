import { TriangleAlertIcon } from "lucide-react";
import { getUserAndRole } from "@/lib/auth/authUtils";

export default async function FailedVerification() {
  const { user } = await getUserAndRole();
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Oops, Verifikacija nije uspešno prošla!
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Vaš e-mail nije uspešno verifikovan. Proverite vašu mail poštu. <br />
          <strong>Vaš e-mail: {user && user?.email}</strong> <br />
          Ako ne vidite mail sa poslatom verifikacijom, proverite u Nepoželjeno
          ili Spam folder.
        </p>
      </div>
    </div>
  );
}
