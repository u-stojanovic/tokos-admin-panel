import Sidebar from "@/components/Sidebar";

export default async function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
