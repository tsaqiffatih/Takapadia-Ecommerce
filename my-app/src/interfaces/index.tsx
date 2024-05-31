import { ObjectId } from "mongodb";

export interface ProductData {
	_id: string;
	name: string;
	slug: string;
	description: string;
	excerpt: string;
	price: number;
	tags: string[];
	thumbnail: string;
	images: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface WishlistData {
	_id: string;
	productId: string;
	userId: string;
	updatedAt: string;
	createdAt: string;
	product: ProductData;
}

export interface payload {
	_id: ObjectId;
	username: string;
	email: string;
}

export interface UserWithId {
	_id: ObjectId
	username: string;
	password: string;
	name: string | undefined
	email: string;
}

export interface Tuser {
	_id: ObjectId
	username: string;
	password: string;
	name: string;
	email: string;
}
