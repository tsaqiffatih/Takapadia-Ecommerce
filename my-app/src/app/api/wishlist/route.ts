import WishlistModel from "@/db/models/wishlist";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const userId = headers().get("userId") ?? "";
	const wishlist = await WishlistModel.getAllWishlist(userId);
	return NextResponse.json(wishlist);
};
