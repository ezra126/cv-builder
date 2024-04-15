import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import errorHandler from "@/app/libs/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const deleteEmpHis = await prisma.educationBackground.delete({
      where: {
        id: id || " ",
      },
    });
    return NextResponse.json(deleteEmpHis);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
