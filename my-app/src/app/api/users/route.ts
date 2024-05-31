import UserModel from "@/db/models/user";
import { userSchema } from "@/validators/userValidator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//get all user
export const GET = async () => {
	const users = await UserModel.getAllUser();

	return NextResponse.json(users);
};

//create user
export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const data = userSchema.parse(body);
		const result = await UserModel.createUser(data);

		return NextResponse.json(
			{ message: "Success register user", result },
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: error.errors[0].message },
				{ status: 400 }
			);
		}
		
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
};
