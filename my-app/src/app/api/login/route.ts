import UserModel from "@/db/models/user";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { loginSchema } from "@/validators/userValidator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const data = loginSchema.parse(body);
		console.log(data.email);
		
		const user = await UserModel.getUserByEmail(data.email);

		if (!user) {
			return NextResponse.json(
				{ message: "invalid email or password" },
				{ status: 404 }
			);
		}

		const isValidPassword = await comparePassword(data.password, user.password);

		if (!isValidPassword) {
			return NextResponse.json(
				{ message: "invalid email or password" },
				{ status: 404 }
			);
		}

		const dataToken = {
			_id: user._id,
			email: user.email,
			username: user.username,
		};

		const accessToken = generateToken(dataToken);
		// console.log(accessToken);
		

		return NextResponse.json(
			{ message: "Success login" , accessToken},
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: error.errors[0].message },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
