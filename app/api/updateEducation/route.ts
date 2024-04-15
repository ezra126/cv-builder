import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import errorHandler from "@/app/libs/errorHandler";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, EducationBackgroundList } = body;

  console.log(EducationBackgroundList[0]);

  try {
    const resumeExist = await prisma.resume.findUnique({
      where: {
        userId: id,
      },
    });

    const educationBackgroundExist = await prisma.educationBackground.findMany({
      where: {
        resumeId: resumeExist?.id,
      },
    });

    if (resumeExist) {
      console.log(
        "Allllllllllllllllllllllllllllllllllle" +
          resumeExist?.id +
          educationBackgroundExist.length
      );

      if (educationBackgroundExist.length != 0) {
        const promise = Promise.all(
          EducationBackgroundList.map(async (item: any) => {
            return await prisma.educationBackground.update({
              where: {
                id: item.id,
              },
              data: {
                resumeId: resumeExist?.id,
                school: item.school,
                degree: item.degree,
                start_date: item.start_date,
                end_date: item.end_date,
                description: item.description,
                city: item.city,
              },
            });
          })
        ).then((values) => {
          console.log("all updated succesfullly");
          console.log(values.length);
        });
      }

      console.log("resume ok");
      return NextResponse.json("resume exist");
    } else {
      console.log("resume not ok");
      const newresume = await prisma.resume.create({
        data: {
          userId: id,
          educationBackground: {
            create: EducationBackgroundList,
          },
        },
        include: {
          educationBackground: true, // Include all posts in the returned object
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
