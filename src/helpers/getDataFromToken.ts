import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {

    const encodedToken = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(encodedToken, process.env.token_secret!);
    if (typeof decodedToken === "object" && decodedToken !== null && "id" in decodedToken) {
        return (decodedToken as jwt.JwtPayload).id;
    }
    return null;

    
}