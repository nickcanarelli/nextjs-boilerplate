import prefetchQuery from "@lib/actions/prefetchQuery";
import { getAllUsers, useGetAllUsers } from "@api/admin/getAllUsers";
import Hydrate from "@lib/helpers/hydrateClient";

export default function AdminIndex() {
  return <div className="text-[80px] font-bold text-primary">Admin Index</div>;
}
