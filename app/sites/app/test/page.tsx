import { getQueryClient } from "@actions";
import { Hydrate } from "@helpers";
import { dehydrate } from "@tanstack/query-core";
import { getTest } from "./getTests";
import ShowTest from "./showTest";

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-test"], getTest);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ShowTest />
    </Hydrate>
  );
}
