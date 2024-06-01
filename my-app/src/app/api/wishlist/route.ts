import WishlistModel from "@/db/models/wishlist";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { WishlistData } from "@/interfaces";
import { wishlistSchema } from "@/validators/wishlistValidator";

export const GET = async (req: NextRequest) => {
	const userId = headers().get("userId") ?? "";
	const wishlist = await WishlistModel.getWishlistByUserId(userId);
	return NextResponse.json(wishlist);
};

export const POST = async (req: NextRequest) => {
	const headersList = headers();
	const userId = headersList.get("userId") as string;

	const body: WishlistData = await req.json();

	try {
		const data = wishlistSchema.parse({
			userId: userId,
			productId: body.productId,
		  });

		const existingWishlist = await WishlistModel.getOneWishlist({
			userId: new ObjectId(userId),
			productId: new ObjectId(body.productId),
		});

		if (existingWishlist) {
			return NextResponse.json({ message: "Product Already in your wishlist" }, { status: 400 });
		}

		const newWishlist = await WishlistModel.createWishlist({ 
			userId: new ObjectId(userId), 
			productId: new ObjectId(body.productId) 
		});

		return NextResponse.json({message: "Wishlist created", data: newWishlist});
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};
