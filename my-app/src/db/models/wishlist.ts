import { ObjectId } from "mongodb";
import { database } from "../config";
import { typeWishlist } from "@/validators/wishlistValidator";
import { WishlistData } from "@/interfaces";

export type Wishlist = typeWishlist;

export default class WishlistModel {
	static collection() {
		return database.collection<WishlistData>("wishlist");
	}

	static async createWishlist(newWishlist: WishlistData) {
		try {
			const { userId, productId } = newWishlist;

			const existingWishlist = await WishlistModel.collection().findOne({
				userId: new ObjectId(userId),
				productId: new ObjectId(productId),
			});
			if (existingWishlist) {
				throw new Error("Wishlist already exists");
			}

			const { insertedId } = await WishlistModel.collection().insertOne(
				newWishlist
			);

			return await WishlistModel.getWishlistById(insertedId.toString());
		} catch (error) {
			console.log(error);
		}
	}

	static async getAllWishlist(id: string) {
		try {
			const wishlist = await WishlistModel.collection()
				.aggregate([
					{
						$match: {
							userId: new ObjectId(id),
						},
					},
					{
						$lookup: {
							from: "products",
							localField: "productId",
							foreignField: "_id",
							as: "Product",
						},
					},
					{
						$unwind: {
							path: "$Product",
							preserveNullAndEmptyArrays: false,
						},
					},
				])
				.toArray();
			return wishlist;
		} catch (error) {
			console.log(error);
		}
	}

	static async getWishlistById(id: string) {
		try {
			const wishlistById = await WishlistModel.collection().findOne({
				_id: new ObjectId(id),
			});

			return wishlistById;
		} catch (error) {
			console.log(error);
		}
	}

	static async getWishlistByUserId(userId: string) {
		// untuk memudah kan, nanti data yang dikembalikan gak cuman product id, tapi ada data productnya cukup dengan menggabungkan data wishlist dengan data product
		try {
			const wishlistByUserId = await WishlistModel.collection()
				.find({
					userId: new ObjectId(userId),
				})
				.toArray();

			return wishlistByUserId;
		} catch (error) {
			console.log(error);
		}
	}

	static async deleteWishlist(id: string) {
		try {
			const { deletedCount } = await WishlistModel.collection().deleteOne({
				_id: new ObjectId(id),
			});

			if (deletedCount === 0) {
				throw new Error("Wishlist not found");
			}
		} catch (error) {
			console.log(error);
		}
	}
}
