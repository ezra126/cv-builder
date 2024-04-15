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
  const { id, newSkill } = body;

  console.log(newSkill.id);

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
      console.log(
        newSkill.id + "Allllllllllllllllllllllllllllllllllle" + resumeExist.id
      );

      const Skill = await prisma.skill.create({
        data: {
          resumeId: resumeExist.id,
          id: newSkill.id,
          skill: newSkill.skill,
          level: newSkill.level,
        },
      });

      //   });
      console.log("resume Exist");
      return NextResponse.json(Skill);
    } else {
      console.log("resume not ok");
    }

    //    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
