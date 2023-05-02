import { Header } from "@lib/components/layout/app";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col bg-light">
      <Header />
      {children}
    </div>
  );
}
