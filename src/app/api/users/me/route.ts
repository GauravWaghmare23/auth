import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";


export async function GET(request: NextRequest) {
    try {
        await connect();
        const userId = getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User fetched successfully",
            data:user
        });

    } catch (error:any) {
        return NextResponse.json({
            message:"Error fetching user",
            error:error.message
        });
    }
}   
