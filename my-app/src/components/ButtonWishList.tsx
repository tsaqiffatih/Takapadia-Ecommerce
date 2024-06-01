"use client";

import { ObjectId } from "mongodb";
import Swal from "sweetalert2";

export default function AddToWishlist({ productId }: { productId: ObjectId }) {
	const handleAddToWishlist = async (productId: ObjectId) => {
		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_URL_API + "/wishlist",
				{
					method: "post",
					body: JSON.stringify({ productId }),
					headers: {
						"content-type": "application/json",
					},
					cache: "no-cache",
				}
			);

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message);
			} else {
				Swal.fire({
					icon: "success",
					title: "Product Added to Wishlist",
					text: "Success added product into your wishlist",
				});
			}
		} catch (error) {
			if (error instanceof Error && "message" in error) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: error.message,
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!, pelase try again later.",
				});
			}
		}
	};

	return (
		<div
			className="btn btn-ghost hover:border hover:bg-transparent rounded hover:border-black"
			onClick={() => {
				handleAddToWishlist(productId);
			}}
		>
			<svg
				className="w-8 h-8 fill-current stroke-current text-black "
				viewBox="0 0 20 20"
			>
				<path
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1"
				></path>
			</svg>
		</div>
	);
}

// inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800
