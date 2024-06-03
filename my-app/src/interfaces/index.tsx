import { ObjectId } from "mongodb";

export interface ProductData {
	_id: ObjectId;
	name: string;
	slug: string;
	description?: string;
	excerpt?: string;
	price?: number;
	tags?: string[];
	thumbnail?: string;
	images?: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface WishlistData {
	_id?: ObjectId | string;
	productId: ObjectId;
	userId: ObjectId;
	updatedAt?: string;
	createdAt?: string;
	Product?: ProductData;
}

export interface payload {
	_id: ObjectId;
	username: string;
	email: string;
}

export interface UserWithId {
	_id: ObjectId;
	username: string;
	password: string;
	name: string | undefined;
	email: string;
}

export interface Tuser {
	_id: ObjectId;
	username: string;
	password: string;
	name: string;
	email: string;
}

export interface CartData {
	_id: ObjectId | string
    userId: ObjectId | string
    productId: ObjectId | string
    quantity: number;
    createdAt: string;
    updatedAt: string;
};