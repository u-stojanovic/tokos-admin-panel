import { TriangleAlertIcon } from "lucide-react";

export default function FailedVerification() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, Verifikacija nije uspešno prošla!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Vaša mail nije uspešno verifikovan. Kontaktirajte administratora.
        </p>
      </div>
    </div>
  );
}
