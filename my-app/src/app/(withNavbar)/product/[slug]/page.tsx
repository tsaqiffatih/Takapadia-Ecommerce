import AddToWishlist from "@/components/ButtonWishList";
import ColorOption from "@/components/ColorOption";
import StartRating from "@/components/ComponentRating";
import SocialMedia from "@/components/ComponentSocialMedia";
import { ProductData } from "@/interfaces";
import { productSchema, typeProduct } from "@/validators/productValidator";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface ProductDetailParams {
	params: {
		slug: string;
	};
}

async function getData(slug: string): Promise<ProductData> {
	const res = await fetch(
		process.env.NEXT_PUBLIC_URL_API + `/products/${slug}`,
		{
			cache: "no-cache",
		}
	);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}
	const {data} : {data: ProductData} = await res.json()
	return data
}

// export async function generateMetadata({ params }: ProductDetailParams): Promise<Metadata> {
// 	const data = await getData(params.slug);
// 	return {
// 		title: data.name, // Atur judul halaman berdasarkan nama produk
// 		description: data.description, // Atur deskripsi halaman berdasarkan deskripsi produk
// 		openGraph: {
// 			title: data.name,
// 			description: data.description,
// 			images: [
// 				{
// 					url: data.images,
// 					alt: data.name,
// 				},
// 			],
// 		},
// 	};
// }

export default async function DetailProductPage({
	params,
}: ProductDetailParams) {
	const data = await getData(params.slug);
	
	const formatCurrency = (price:number) => {
		let rupiahFormat = new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
		  }).format(price);
		return rupiahFormat;
	}

	// console.log(formatCurrency(data.price));

	return (
		<section className="text-gray-700 mt-20 body-font overflow-hidden bg-white ">
			<div className="container px-6 py-16 mx-auto border border-black">
				<div className="lg:w-4/5 mx-auto flex flex-wrap ">
					<Image
						alt="ecommerce"
						className="lg:w-1/2 w-full object-cover object-center rounded border border-black"
						src={data.images[0]}
						width={400}
						height={400}
					/>
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col justify-between">
						{/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
							BRAND NAME
						</h2> */}
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
							{data.name}
						</h1>
						<div className="flex mb-4">
							<StartRating />
							<SocialMedia />
						</div>
						<p className="leading-relaxed flex-grow">{data.description}</p>
						<ColorOption />
						<div className="flex items-center">
							<span className="title-font font-medium text-2xl text-gray-900">
								{formatCurrency(data.price)}
							</span>
							<button className="flex ml-auto text-black font-semibold border border-black py-2 px-6 hover:bg-red-600 rounded">
								Buy
							</button>
							<span className="ml-4"></span>
							<AddToWishlist />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
