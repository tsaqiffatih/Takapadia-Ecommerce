import { ObjectId } from "mongodb";
import { database } from "../config";
import { typeWishlist } from "@/validators/wishlistValidator";
import { WishlistData } from "@/interfaces";

export type Wishlist = typeWishlist;

export default class WishlistModel {
	static collection() {
		return database.collection<WishlistData>("wishlist");
	}

	static async createWishlist({
		userId,
		productId,
	}: {
		userId: ObjectId;
		productId: ObjectId;
	}) {
		try {
			const existingWishlist = await WishlistModel.collection().findOne({
				userId,
				productId,
			});

			if (existingWishlist) {
				throw new Error("Wishlist already exists");
			}

			const { insertedId } = await WishlistModel.collection().insertOne({
				userId,
				productId,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});

			return await WishlistModel.getWishlistById(insertedId);
		} catch (error) {
			console.log(error);
			throw new Error(String(error));
		}
	}

	static async getOneWishlist({
		userId,
		productId,
	}: {
		userId: ObjectId;
		productId: ObjectId;
	}) {
		try {
			const existingWishlist = await WishlistModel.collection().findOne({
				userId,
				productId,
			});

			if (existingWishlist) {
				return await WishlistModel.getWishlistById(existingWishlist._id);
			}

			return null
		} catch (error) {
			console.log(error);
			throw new Error(String(error));
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

	static async getWishlistById(id: string | ObjectId) {
		try {
			const wishListId = typeof id === "string" ? new ObjectId(id) : id;

			const wishlistById = await WishlistModel.collection().findOne({
				_id: wishListId,
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
