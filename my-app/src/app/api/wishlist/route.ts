import WishlistModel from "@/db/models/wishlist";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { WishlistData } from "@/interfaces";
import { wishlistSchema } from "@/validators/wishlistValidator";

// geting user wishlist by userId
export const GET = async (req: NextRequest) => {
	try {
		const userId = headers().get("userId") ?? "";
		const wishlist = await WishlistModel.getWishlistByUserId(userId);
		return NextResponse.json(wishlist);
	} catch (error) {
		console.log(error);
		
		throw new Error(String(error));
	}
};

// create wishlist user
export const POST = async (req: NextRequest) => {
	const headersList = headers();
	const userId = headersList.get("userId") as string;

	const body: WishlistData = await req.json();

	try {
		const existingWishlist = await WishlistModel.getOneWishlist({
			userId: new ObjectId(userId),
			productId: new ObjectId(body.productId),
		});

		if (existingWishlist) {
			return NextResponse.json(
				{ message: "Product Already in your wishlist" },
				{ status: 400 }
			);
		}

		const newWishlist = await WishlistModel.createWishlist({
			userId: new ObjectId(userId),
			productId: new ObjectId(body.productId),
		});

		return NextResponse.json({
			message: "Wishlist created",
			data: newWishlist,
		});
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};

// delete wishlist user by id
export const DELETE = async (req: NextRequest) => {
	const { wishlistId } = await req.json();

	try {

		const removedWishlist = await WishlistModel.deleteWishlist({
			id: wishlistId,
		});

		if (!removedWishlist) {
			return NextResponse.json(
				{ message: "Wishlist not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: `Success deleted wishlist`,
			removedWishlist,
		});
	} catch (error) {
		console.log(error);
		throw new Error(String(error));
	}
};
