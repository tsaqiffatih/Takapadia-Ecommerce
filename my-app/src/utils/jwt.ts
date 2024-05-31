import { payload } from "@/interfaces";
import { sign, verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const generateToken = (payload: payload): string => {
    const secret = process.env.JWT_SECRET || "default-secret"; // Provide a default value for JWT_SECRET
    return sign(payload, secret);
};

export const verifyToken = (token: string): payload => {
    const secret = process.env.JWT_SECRET || "default-secret";
    return verify(token, secret) as payload;
}