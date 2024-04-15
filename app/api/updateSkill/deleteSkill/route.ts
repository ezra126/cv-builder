import prisma from "@/app/libs/prismadb";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const deleteSkill = await prisma.skill.delete({
      where: {
        id: id || " ",
      },
    });
    return NextResponse.json(deleteSkill);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
