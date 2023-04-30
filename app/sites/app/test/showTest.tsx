"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTest } from "./getTests";

export default function ShowTest() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-test"],
    queryFn: () => getTest(),
  });

  return (
    <main className="h-full flex items-center justify-center">
      {error ? (
        <p className="text-[80px] font-bold text-error-primary">
          Oh no, there was an error
        </p>
      ) : isLoading || isFetching ? (
        <p className="text-[80px] font-bold text-secondary">Loading...</p>
      ) : data ? (
        <div className="text-[80px] font-bold text-primary">
          {JSON.stringify(data)}
        </div>
      ) : null}
    </main>
  );
}
