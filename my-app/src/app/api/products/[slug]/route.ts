import ProductModel from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export type SlugProduct = {
	params: {
		slug: string;
	};
};

export const GET = async (_request: NextRequest, { params }: SlugProduct) => {
	try {
		const product = await ProductModel.getProductBySlug(params.slug);
		if (!product) {
			return NextResponse.json({ message: "no product found" }, { status: 404 });
		}

		return NextResponse.json({ data: product });
	} catch (error) {
		console.log(error);
	}
};
