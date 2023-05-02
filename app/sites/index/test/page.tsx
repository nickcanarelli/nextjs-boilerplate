import { prefetchQuery } from "@actions";
import { getUsers } from "./getUsers";
import ListUsers from "./list-users";
import { Hydrate } from "@helpers";

export default async function Hydation() {
  const dehydratedState = prefetchQuery("hydrate-users", getUsers);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
