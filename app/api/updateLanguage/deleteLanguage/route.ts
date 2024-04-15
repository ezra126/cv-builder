import prisma from "@/app/libs/prismadb";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const deleteLink = await prisma.language.delete({
      where: {
        id: id || " ",
      },
    });
    return NextResponse.json(deleteLink);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
