"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./getUsers";
import Image from "next/image";

export default function ListUsers() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUsers(),
  });

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {data.map((user) => (
            <div
              key={user.id}
              className="col-span-1 md:col-span-3 bg-surface border border-light rounded-lg p-8"
            >
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                width="180"
                height="180"
                priority
              />
              <div className="text-primary text-lg font-semibold mt-4 text-center">
                {user.name}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
