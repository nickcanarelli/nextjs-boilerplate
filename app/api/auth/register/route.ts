import { prisma } from "@helpers/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse(
        JSON.stringify({
          error:
            "Email address already exists. If you forgot your password, try resetting it.",
        }),
        {
          status: 400,
        }
      );
    }

    // Create user in db as standard user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // TODO: Create customer in Stripe as standard customer
    // TODO: Send verification email to user

    return NextResponse.json({
      user: {
        email: user.email,
      },
    });
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
