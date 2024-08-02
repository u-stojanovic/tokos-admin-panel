import Link from "next/link";
import {
  Package2Icon,
  UsersIcon,
  ShoppingCartIcon,
  PackageIcon,
  LineChartIcon,
} from "lucide-react";
import { Button } from "../ui/button";

export default function AdminLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <span>Tokos</span>
        </Link>
        <Link href="/admin-panel/dashboard" prefetch={false}>
          <Button variant="destructive">Admin Panel</Button>
        </Link>
      </header>
      <main className="flex-1 bg-background py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Dobrodošli u Admin Panel Tokos-a
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Upravljajte vašom online prodavnicom lako. Pratite narudžbine,
                ažurirajte proizvode i još mnogo toga.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-6 text-left space-y-2">
                <ShoppingCartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">
                  Upravljanje porudžbinama
                </h3>
                <p className="text-muted-foreground">
                  Pregledajte i upravljajte svim narudžbinama na jednom mestu.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-6 text-left space-y-2">
                <PackageIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Katalog proizvoda</h3>
                <p className="text-muted-foreground">
                  Dodajte, uredite i organizujte vaš katalog proizvoda.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-6 text-left space-y-2">
                <UsersIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Upravljanje kupcima</h3>
                <p className="text-muted-foreground">
                  Upravljajte informacijama i interakcijama sa vašim kupcima.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-6 text-left space-y-2">
                <LineChartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">
                  Analitika i izveštavanje
                </h3>
                <p className="text-muted-foreground">
                  Steknite uvid u analitiku vaše prodavnice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
