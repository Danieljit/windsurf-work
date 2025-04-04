import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { SpaceType } from "@prisma/client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const location = searchParams.get("location")
  const type = searchParams.get("type") as SpaceType | null

  const spaces = await db.space.findMany({
    where: {
      ...(location ? { location: { contains: location } } : {}),
      ...(type ? { type } : {}),
    },
    include: {
      owner: true,
    },
  })
  return NextResponse.json(spaces)
}

export async function POST(req: Request) {
  const session = await auth()

  if (!session || !session.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const json = await req.json()

  const space = await db.space.create({
    data: {
      ...json,
      ownerId: session.user.id,
    },
  })

  return NextResponse.json(space)
}
