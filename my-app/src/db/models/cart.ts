import { ObjectId } from "mongodb";
import { database } from "../config";
import { CartData } from "@/interfaces";

export type Cart = {
    userId: ObjectId | string
    productId: ObjectId | string
    quantity: number;
    createdAt: string;
    updatedAt: string;
};

export default class CartModel {

    static async createCart({
        userId,
        productId,
        quantity,
    }: {
        userId: ObjectId | string
        productId: ObjectId | string
        quantity: number;
    }) {
        try {
            const existingCart = await database.collection<Cart>("cart").findOne({
                userId,
                productId,
            });

            if (existingCart) {
                throw new Error("Cart already exists");
            }

            const { insertedId } = await database.collection<Cart>("cart").insertOne({
                userId,
                productId,
                quantity,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            return await CartModel.getCartById(insertedId);
        } catch (error) {
            console.log(error);
            throw new Error(String(error));
        }
    }

    static async getCartById(_id: ObjectId | string) {
        try {
            const cart = await database.collection<CartData>("cart").findOne({ _id });
            return cart;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getCartByUserId(userId: ObjectId | string) {
        try {
            const cart = await database.collection<CartData>("cart").find({ userId }).toArray();
            return cart;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async postUpdateCartProductQuantity({
        _id,
        quantity,
    }: {
        _id: ObjectId | string
        quantity: number;
    }) {
        try {
            const data = await database.collection<CartData>("cart").findOneAndUpdate(
                { _id },
                {
                    $set: {
                        quantity,
                        updatedAt: new Date().toISOString(),
                    },
                },
                { returnDocument: "after" }
            );

            return data
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}