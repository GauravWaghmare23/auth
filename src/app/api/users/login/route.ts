import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest){
    try {
        await connect();
        const reqBody = await request.json();
        const {email,password} = reqBody;

        //find user if exist
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        //validate password
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        const token = jwt.sign(tokenData,process.env.token_secret!,{expiresIn:"1d"});

        const response = NextResponse.json({ message: "Login successful", success:true, user: {
                id: user._id,
                username: user.username,
                email: user.email
            } }, { status: 200 });

        response.cookies.set("token",token,{ httpOnly: true});
        console.log(response)
        return response;

    } catch (error) {
        return NextResponse.json({error: "Failed to login"}, {status: 500});
    }
}