// import getCurrentUser from "@actions/getCurrentUser";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUser = await getCurrentUser();
  return (
    <div className="flex min-h-full w-full">
      <div className="m-4 flex w-full max-w-[728px] flex-1 flex-col justify-center rounded-2xl bg-surface lg:flex-none ">
        <div className="mx-auto w-full max-w-[360px] lg:w-[360px]">
          {children}
        </div>
      </div>
      {/* <div className="text-secondary flex flex-1 items-center justify-center max-w-[300px] mx-auto">
        {JSON.stringify(currentUser, null, 2)}
      </div> */}
    </div>
  );
}
