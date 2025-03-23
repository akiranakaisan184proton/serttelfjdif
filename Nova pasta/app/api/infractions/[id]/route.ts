import { NextResponse } from "next/server"
import { getInfractionById } from "@/data/infractions"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const infraction = getInfractionById(id)

  if (!infraction) {
    return NextResponse.json({ error: "Infração não encontrada" }, { status: 404 })
  }

  return NextResponse.json(infraction)
}

