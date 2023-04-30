import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json("Welcome, from Test!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
}
