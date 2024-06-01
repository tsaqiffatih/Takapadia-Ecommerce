import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
		const authorization = cookies().get("Authorization");
		if (!authorization) {
			return NextResponse.json(
				{
					message: "You have to login for adding the product to wishlist",
				},
				{ status: 401 }
			);
		}
		const token = authorization.value.split(" ");
		if (!token[1]) {
			return NextResponse.json(
				{
					message: "You have to login for adding the product to wishlist",
				},
				{ status: 401 }
			);
		}

		const JWT_SECRET: string = process.env.JWT_SECRET || "";

		const secret = new TextEncoder().encode(JWT_SECRET);
		const jwt = token[1];

		const { payload } = await jwtVerify<{
			_id: string;
			email: string;
			username: string;
		}>(jwt, secret);

		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("userId", payload._id);
		requestHeaders.set("username", payload.username);
		requestHeaders.set("email", payload.email);

		const response = NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
		return response;
	}

	if (request.nextUrl.pathname.startsWith("/login")) {
		const auth = cookies().get("Authorization");
		if (auth) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (request.nextUrl.pathname.startsWith("/wishlist")) {
		const auth = cookies().get("Authorization");
		if (!auth) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (request.nextUrl.pathname.startsWith("/register")) {
		const auth = cookies().get("Authorization");
		if (auth) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
