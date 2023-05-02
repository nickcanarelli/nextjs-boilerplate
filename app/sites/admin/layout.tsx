import getCurrentUser from "@lib/actions/getCurrentUser";
import { Sidebar } from "@lib/components/layout/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="h-full flex">
      <Sidebar user={user} />
      <main className="flex flex-1 w-full p-4">{children}</main>
    </div>
  );
}
