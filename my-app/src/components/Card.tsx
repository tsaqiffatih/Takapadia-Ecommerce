// import "./card.css";
import Link from "next/link";
import Image from "next/image";
import AddToWishlist from "./ButtonWishList";
import { typeProduct } from "@/validators/productValidator";
import { ProductData } from "@/interfaces";

export default function Card({
	product,
}: {
	product: ProductData;
}) {

	const formatCurrency = (price: number | undefined) => {
		// if price is undefined, return empty string. See validators/productValidator.ts
		if (price === undefined) {
			return ""; 
		}
		let rupiahFormat = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(price);
		return rupiahFormat;
	};

	return (
		<div className="card card-compact w-1/2 card-bordered border-black md:w-60 shadow-xl mb-2">
			<figure>
				<Image
					src={product.thumbnail ?? ''} 
					alt={product.name} 
					className="border-b border-black"
					width={300}
					height={300}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title text-black">
					{product.name}
				</h2>
				<p className="text-black truncate-20">
					{product.description}
				</p>
				<div className="">
					<p className="text-black">
						<strong>{formatCurrency(product.price)}</strong>
					</p>
				</div>
				<div className="card-actions items-center justify-center space-x-20 ">
					<div className="hover:border rounded hover:border-black">
						<Link
							href={`product/${product.slug}`}
							className=" text-black font-semibold"
						>
							See details
						</Link>
					</div>
					<AddToWishlist productId={product._id}/>
				</div>
			</div>
		</div>
	);
}
