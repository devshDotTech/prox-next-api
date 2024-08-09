import { NextRequest, NextResponse } from "next/server"

const GET = (req: NextRequest) => {
    return NextResponse.json({msg: "Hello Motherfucker"})
}

export {
    GET
}