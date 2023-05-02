import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "./getQueryClient";

interface PrefetchQueryProps {
  queryKey: string;
  queryFn: any;
}

export default async function prefetchQuery(
  queryKey: string,
  queryFn: () => Promise<any>
) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([queryKey], queryFn);
  const dehydratedState = dehydrate(queryClient);

  return dehydratedState;
}
