import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import errorHandler from "@/app/libs/errorHandler";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

// type ResumeEmployement = {
//   job_title: String;
//   company: String;
//   start_date: String;
//   end_date: String;
//   city: String;
//   description: String;
// }[];

export async function POST(request: Request) {
  const body = await request.json();
  const { id, content } = body;

  try {
    const resumeExist = await prisma.resume.findUnique({
      where: {
        userId: id,
      },
    });

    if (resumeExist) {
      console.log(
        "Allllllllllllllllllllllllllllllllllle" + resumeExist.id + content
      );

      const updatedObjective = await prisma.resume
        .update({
          where: {
            id: resumeExist.id,
          },
          data: {
            objective: content,
          },
        })
        .then((value) => {
          console.log("updated succesfully");
        })
        .catch((error) => {
          console.log(error);
        });

      //   console.log("resume ok");
      return NextResponse.json({ updatedObjective });
    } else {
      console.log("resume not ok");
      const newresume = await prisma.resume.create({
        data: {
          userId: id,
          objective: content,
        },
      });
      return NextResponse.json({ newresume });
      //   throw Error("resu not exist");
    }

    //    }
  } catch (e: any) {
    console.log(e);
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
