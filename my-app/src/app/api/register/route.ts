import UserModel from "@/db/models/user";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/validators/userValidator";

export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const data = userSchema.parse(body);
		
		const user = await UserModel.getUserByEmail(data.email);

		if (user) {
			return NextResponse.json(
				{ message: "Email already registered" },
				{ status: 400 }
			);
		}

        const username = await UserModel.getUserByUsername(data.username);

        if (username) {
            return NextResponse.json(
                { message: "Username already registered" },
                { status: 400 }
            );
        }

		const newUser = await UserModel.createUser({
			email: data.email,
			password: data.password,
			username: data.username,
		});

		return NextResponse.json(
			{ message: "Success register", newUser },
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

// export const GET = async (request: Request) => {
//     return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }
