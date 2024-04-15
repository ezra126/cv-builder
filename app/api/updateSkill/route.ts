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
  const { id, skillLists } = body;

  try {
    const resumeExist = await prisma.resume.findUnique({
      where: {
        userId: id,
      },
    });

    const skillExist = await prisma.skill.findMany({
      where: {
        resumeId: resumeExist?.id,
      },
    });

    if (resumeExist) {
      console.log("Allllllllllllllllllllllllllllllllllle" + resumeExist.id);
      // console.log(employementHistory);
      //   const deleteEmployementHistory =
      //     await prisma.employementHistory.deleteMany({
      //       where: {
      //         resumeId: resumeExist.id,
      //       },
      //     });
      console.log(skillExist[0], skillExist[1]);
      if (skillExist.length != 0) {
        const promise = Promise.all(
          skillLists.map(async (item: any) => {
            return await prisma.skill.update({
              where: {
                id: item.id,
              },
              data: {
                resumeId: resumeExist.id,
                skill: item.skill,
                level: item.level,
              },
            });
          })
        ).then((values) => {
          console.log("all updated succesfullly");
          console.log(values.length);
        });
      }

      //  await prisma.employementHistory.update({
      //    data: resumeEmployement.map((item: any) => {
      //      return {
      //        resumeId: resumeExist.id,
      //        job_title: item.job_title,
      //        company: item.company,
      //        start_date: item.start_date,
      //        end_date: item.end_date,
      //        description: item.description,
      //        city: item.city,
      //      };
      //    }),
      //  });

      //  await prisma.employementHistory.update({
      //    data: resumeEmployement.map((item: any) => {
      //      return {
      //        resumeId: resumeExist.id,
      //        job_title: item.job_title,
      //        company: item.company,
      //        start_date: item.start_date,
      //        end_date: item.end_date,
      //        description: item.description,
      //        city: item.city,
      //      };
      //    }),
      //  });

      //   //   const newresume = await prisma.employementHistory.update({
      //     where: {
      //       userId: id,
      //     },
      //     data: {
      //       employementHistory: employementHistory,
      //     },
      //     include: {
      //       employementHistory: true, // Include all posts in the returned object
      //     },
      //   });
      console.log("resume ok");
      return NextResponse.json("resume exist");
    } else {
      console.log("resume not ok");
      const newresume = await prisma.resume.create({
        data: {
          userId: id,
          skills: {
            create: skillLists,
          },
        },
        include: {
          skills: true, // Include all posts in the returned object
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
