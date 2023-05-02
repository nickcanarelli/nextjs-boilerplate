import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "@actions/getQueryClient";
import Hydrate from "@helpers/hydrateClient";
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
