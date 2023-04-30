import { getQueryClient } from "@actions";
import { Hydrate } from "@helpers";
import { dehydrate } from "@tanstack/query-core";
import { getUsers } from "./getUsers";
import ListUsers from "./list-users";

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
