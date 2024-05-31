import { database } from "../config";
import { ObjectId } from "mongodb";
import { ProductData } from "@/interfaces";
import { typeProduct } from "@/validators/productValidator";

export type Product = typeProduct;

export default class ProductModel {
	static collection() {
		return database.collection<Product>("products");
	}

	static async createProduct(newProduct: Product) {
		try {
			const existingProduct = await ProductModel.collection().findOne({
				name: newProduct.name,
			});
			if (existingProduct) {
				throw new Error("Product already exists");
			}

			const { insertedId } = await ProductModel.collection().insertOne(
				newProduct
			);

			return await ProductModel.getProductById(insertedId.toString()); // Convert ObjectId to string
		} catch (error) {
			console.log(error);
		}
	}

	static async getAllProduct() {
		try {
			const products = await ProductModel.collection().find().toArray();
			return products;
		} catch (error) {
			console.log(error);
		}
	}

	static async getProductById(id: string) {
		try {
			const productById = await ProductModel.collection().findOne({
				_id: new ObjectId(id),
			});

			return productById;
		} catch (error) {
			console.log(error);
		}
	}

	static async getProductBySlug(slug: string) {
		try {
			const productBySlug = await ProductModel.collection().findOne({
				slug,
			});

			if (!productBySlug) throw new Error("Product not found");

			return productBySlug;
		} catch (error) {
			console.log(error);
		}
	}

	static async updateProduct(id: string, updatedProduct: Product) {
		try {
			const { modifiedCount } = await ProductModel.collection().updateOne(
				{ _id: new ObjectId(id) },
				{ $set: updatedProduct }
			);

			if (modifiedCount === 0) {
				throw new Error("Product not found");
			}

			return await ProductModel.getProductById(id);
		} catch (error) {
			console.log(error);
		}
	}

	static async deleteProduct(id: string) {
		try {
			const { deletedCount } = await ProductModel.collection().deleteOne({
				_id: new ObjectId(id),
			});

			if (deletedCount === 0) {
				throw new Error("Product not found");
			}

			return { message: "Product deleted" };
		} catch (error) {
			console.log(error);
		}
	}
}

/*
import { database } from '../config';

export type Product = {
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductCount = {
  totalCount: number;
};

export const fetchProductList = async (
  searchQuery: string,
  pageQuery: number
) => {
  // const db = await getDb();

  return database
    .collection<Product>('products')
    .aggregate([
      {
        $match: {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: pageQuery,
      },
      {
        $limit: 5,
      },
    ])
    .toArray();
};

export const fetchProductListWithoutSearch = async (pageQuery: number) => {
  // const db = await getDb();

  return database
    .collection<Product>('products')
    .aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: pageQuery,
      },
      {
        $limit: 5,
      },
    ])
    .toArray();
};

export const getTotalData = async (searchQuery: string) => {
  // const db = await getDb();
  return database.collection<ProductCount>('products').countDocuments({
    name: {
      $regex: searchQuery,
      $options: 'i',
    },
  });
};

export const getProductDetail = async (slug: string) => {
  // const db = await getDb();
  return database.collection<Product>('products').findOne({ slug });
};
*/
