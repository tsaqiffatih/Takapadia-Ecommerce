// import "./card.css";
import Link from "next/link";
import Image from "next/image";
import AddToWishlist from "./ButtonWishList";
import { ProductData } from "@/interfaces";

export default function Card({ product }: { product: ProductData }) {
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
					src={product.thumbnail ?? ""}
					alt={product.name}
					className="border-b border-black"
					width={300}
					height={300}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title text-black">{product.name}</h2>
				<p className="text-black truncate-20">{product.description}</p>
				<div className="">
					<p className="text-black">
						<strong>{formatCurrency(product.price)}</strong>
					</p>
				</div>
				<div className="card-actions mt-2 items-center justify-center flex space-x-7 ">
					<div className="">
						<Link
							href={`product/${product.slug}`}
							className=" text-black font-semibold hover:border hover:bg-transparent btn btn-ghost rounded hover:border-black p-3"
						>
							See details
						</Link>
					</div>
					<AddToWishlist productId={product._id} />
				</div>
			</div>
		</div>
	);
}
