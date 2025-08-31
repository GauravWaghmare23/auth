import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/dbconfig/dbconfig";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connect();
        
        const { username, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await user.save();

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}