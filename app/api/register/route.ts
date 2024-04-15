import prisma from "../../libs/prismadb";
import bcrypt from "bcrypt";
import errorHandler from "@/app/libs/errorHandler";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { first_name, last_name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("userexist", userExist);
    if (userExist) {
      throw Error("user already exist");
    } else {
      const user = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
        },
      });

      return Response.json(user);
    }
  } catch (e: any) {
    console.log(e);
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner

    //   if (e.code === "P2002") {
    //     console.log(
    //       "There is a unique constraint violation, a new user cannot be created with this email"
    //     );
    //     console.log("e", e);
    //     return NextResponse.json(
    //       { error: "user already exist" },
    //       { status: 500 }
    //     );
    //   }
    // }
    return NextResponse.json({ message: e.message }, { status: 500 });
    // throw e;
  }

  // const res = await fetch("https://data.mongodb-api.com/...", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();
}
