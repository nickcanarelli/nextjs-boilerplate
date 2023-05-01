import { getBaseUrl } from "@actions";

export async function getTest() {
  const res = await fetch(getBaseUrl() + "/api/hello");
  const users = await res.json();
  return users;
}
