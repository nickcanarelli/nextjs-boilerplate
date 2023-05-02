import { getAllUsers } from "@api/admin/getAllUsers";
import prefetchQuery from "@lib/actions/prefetchQuery";
import UsersTable from "@lib/components/sites/admin/UsersTable/UsersTable";
import Hydrate from "@lib/helpers/hydrateClient";
import React from "react";

export default function Users() {
  const dehydratedState = prefetchQuery("getAllUsers", getAllUsers);

  return (
    <Hydrate state={dehydratedState}>
      <UsersTable />
    </Hydrate>
  );
}
