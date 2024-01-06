import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        console.log("userId: ", userId)
        const user = await User.findById(userId).select("-password")
        console.log("user: ", user)
        return NextResponse.json({ data: user, message: "User found" })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}