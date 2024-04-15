import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  console.log("fgetttttttttttttttttttt" + id);

  try {
    const resumeExist = await prisma.resume.findUnique({
      where: {
        userId: id,
      },
    });
    if (!resumeExist) {
      console.log("resume not existed");
      return NextResponse.json("resume not exist");
    } else {
      const EducationList = await prisma.educationBackground.findMany({
        where: {
          resumeId: resumeExist.id,
        },
      });

      console.log("resume existed");
      //return NextResponse.json("resume exist exist");

      //   console.log(EducationList + "is existed");

      const EmploymentHistoryList = await prisma.employementHistory.findMany({
        where: {
          resumeId: resumeExist.id,
        },
      });
      const LanguageList = await prisma.language.findMany({
        where: {
          resumeId: resumeExist.id,
        },
      });
      const SkillList = await prisma.skill.findMany({
        where: {
          resumeId: resumeExist.id,
        },
      });
      const Objective = resumeExist.objective;
      return NextResponse.json({
        EducationList,
        EmploymentHistoryList,
        LanguageList,
        SkillList,
        Objective,
      });
    }
  } catch (e: any) {
    // console.log(e);
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
