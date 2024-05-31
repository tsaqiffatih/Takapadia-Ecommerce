import { ObjectId, Collection } from "mongodb";
import { database } from "../config";
import { hashPassword } from "../../utils/bcrypt";
import { typeUser, typeUserResponse } from "@/validators/userValidator";
import { Tuser } from "@/interfaces";

export type User = typeUser;

export default class UserModel {
	static collection(): Collection<User> {
		return database.collection<User>("users");
	}

	static async createUser(newUser: User) {
		try {
			const existingEmailUser = await UserModel.collection().findOne({
				email: newUser.email,
			});
			if (existingEmailUser) {
				throw new Error("Email already exists");
			}

			const existingUsernameUser = await UserModel.getUserByUsername(
				newUser.username
			);
			if (existingUsernameUser) {
				throw new Error("Username already exists");
			}

			newUser.password = await hashPassword(newUser.password);
			const { insertedId } = await UserModel.collection().insertOne(newUser);
			const result = await UserModel.getUserById(insertedId);

			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async getAllUser() {
		const users = await database
			.collection<User>("users")
			.find()
			.project({ password: 0 })
			.toArray();
		return users;
	}

	static async getUserByEmail(email: string) {
		try {
			const user = await database.collection<Tuser>("users").findOne({ email });
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async getUserByUsername(
		username: string
	): Promise<typeUserResponse | null> {
		try {
			const user = await UserModel.collection().findOne({ username });
			if (!user) return null;
			const { password, ...rest } = user;
			return rest;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async getUserById(
		id: string | ObjectId
	): Promise<typeUserResponse | null> {
		try {
			const objectId = typeof id === "string" ? new ObjectId(id) : id;
			const user = await UserModel.collection().findOne(
				{ _id: objectId },
				{ projection: { password: 0 } }
			);
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async getUsernameById(userId: string): Promise<string | null> {
		try {
			const user = await UserModel.getUserById(userId);
			return user ? user.username : null;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async searchUsers(keyword: string): Promise<typeUserResponse[]> {
		try {
			const users = await UserModel.collection()
				.find({
					$or: [
						{ name: { $regex: keyword, $options: "i" } },
						{ username: { $regex: keyword, $options: "i" } },
					],
				})
				.toArray();
			return users.map(({ password, ...rest }) => rest);
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}
