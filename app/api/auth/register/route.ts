// import { prisma } from "@helpers/prismaClient";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// export async function POST(request: Request) {
//   const { email, password, role } = await request.json();
//   const hashedPassword = await bcrypt.hash(password, 12);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       hashedPassword,
//       role: role ?? "user",
//     },
//   });

//   return NextResponse.json(user);
// }
