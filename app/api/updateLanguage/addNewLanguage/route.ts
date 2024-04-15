import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

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
  const { id, newLanguage } = body;

  console.log("sdkmkdjfnjknfjk");

  //   const employementHistory = resumeEmployement.map(
  //     ({ id, ...rest }: { id: String }) => rest
  //   );

  //   console.log(employementHistory[0].id, employementHistory[0].job_title);

  //   const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const resumeExist = await prisma.resume.findUnique({
      where: {
        userId: id,
      },
    });

    if (resumeExist) {
      //   console.log(
      //     newSkill.id + "Allllllllllllllllllllllllllllllllllle" + resumeExist.id
      //   );

      const Language = await prisma.language.create({
        data: {
          resumeId: resumeExist.id,
          id: newLanguage.id,
          language: newLanguage.language,
          level: newLanguage.level,
        },
      });

      //   });
      console.log("resume Exist");
      return NextResponse.json(Language);
    } else {
      console.log("resume not ok");
    }

    //    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
