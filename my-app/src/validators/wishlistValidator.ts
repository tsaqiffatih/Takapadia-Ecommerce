import { z } from "zod";

// Schema untuk entitas Wishlist
export const wishlistSchema = z.object({
	userId: z
		.string()
		.min(1, { message: "the User Id cannot be empty" }),
	productId: z
		.string()
		.min(1, { message: "The Product ID cannot be empty" }),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type typeWishlist = z.infer<typeof wishlistSchema>;
