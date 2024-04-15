import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import errorHandler from "@/app/libs/errorHandler";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    date_of_birth,
    nationality,
  } = body;
  console.log(body + "semtehal");

  //   const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (userExist) {
      const updateUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          first_name,
          last_name,
          email,
          phone_number,
          date_of_birth,
          nationality,
        },
      });
      console.log("updated ok");
      return NextResponse.json(updateUser);
    } else {
      throw Error("user not exist");
    }

    //    }
  } catch (e: any) {
    console.log("eroror dcasnh");
    return NextResponse.json({ message: e.message }, { status: 500 });
    // console.log(e);  return NextResponse.json({ message: e.message }, { status: 500 });
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
