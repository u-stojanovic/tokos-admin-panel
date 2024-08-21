import Link from "next/link";

export default function SuccessVerification() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
            Email je Verifikovan
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Vaša mail je uspešno verifikovan. Sada možete nastaviti na Vaš
            nalog.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div />
          <div>
            <Link href="/login">Nastavite</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
