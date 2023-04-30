export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full flex">{children}</div>;
}
