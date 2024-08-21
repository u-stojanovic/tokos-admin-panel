import Link from "next/link";
import {
  ShoppingCartIcon,
  PackageIcon,
  HistoryIcon,
  BellIcon,
} from "lucide-react";
import { Button } from "../ui/button";

export default function WorkerLanding() {
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
        <Link href="/worker-panel/porudzbine" prefetch={false}>
          <Button variant="destructive">Idite na Panel</Button>
        </Link>
      </header>
      <main className="flex-1 bg-background py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Dobrodošli u Panel Tokos-a
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-6 text-left space-y-2">
                <ShoppingCartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">
                  Upravljanje porudžbinama
                </h3>
                <p className="text-muted-foreground">
                  Pregledajte i upravljajte svim vašim narudžbinama na jednom
                  mestu.
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
                <HistoryIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Istorija</h3>
                <p className="text-muted-foreground">
                  Pregledajte nedavne porudžbine i promene.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-6 text-left space-y-2">
                <BellIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Notifikacije</h3>
                <p className="text-muted-foreground">
                  Primajte obaveštenja o novim porudžbinama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
