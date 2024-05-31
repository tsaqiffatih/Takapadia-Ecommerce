import { typeWishlist } from "@/app/validators/wishlistValidator";
import { ObjectId } from "mongodb";
import { database } from "../config";

export type Wishlist = typeWishlist;

export default class WishlistModel {
	static collection() {
		return database.collection<Wishlist>("wishlist");
	}

	static async createWishlist(newWishlist: Wishlist) {
		try {
			const existingWishlist =
				await WishlistModel.collection().findOne({
					userId: newWishlist.userId,
					productId: newWishlist.productId,
				});
			if (existingWishlist) {
				throw new Error("Wishlist already exists");
			}

			const { insertedId } =
				await WishlistModel.collection().insertOne(newWishlist);

			return await WishlistModel.getWishlistById(
				insertedId.toString()
			); // Convert ObjectId to string
		} catch (error) {
			console.log(error);
		}
	}

	static async getAllWishlist() {
		try {
			const wishlist = await WishlistModel.collection()
				.find()
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
					userId: userId,
				})
				.toArray();

			return wishlistByUserId;
		} catch (error) {
			console.log(error);
		}
	}

	static async updateWishlist(id: string, updatedWishlist: Wishlist) {
		try {
			const { modifiedCount } =
				await WishlistModel.collection().updateOne(
					{ _id: new ObjectId(id) },
					{ $set: updatedWishlist }
				);

			if (modifiedCount === 0) {
				throw new Error("Wishlist not found");
			}

			return await WishlistModel.getWishlistById(id);
		} catch (error) {
			console.log(error);
		}
	}

	static async deleteWishlist(id: string) {
		try {
			const { deletedCount } =
				await WishlistModel.collection().deleteOne({
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
