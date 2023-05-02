export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="m-4 flex w-full max-w-[410px] flex-1 flex-col justify-center rounded-2xl bg-surface lg:flex-none p-6">
        {children}
      </div>
    </div>
  );
}
