"use client";
import { ProductData } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Feature() {
	const [products, setProducts] = useState<ProductData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products`);
				const data = await res.json();
				setProducts(data.slice(0, 9));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="mt-3">
				<p className="font-bold text-4xl mb-1">Featured Products</p>
				{products.length != 0 ? (
					<div className="m-2 mb-1 overflow-x-auto scroll-container">
						<div className="flex space-x-4 ">
							{products.map((product, index) => (
								<div
									key={index}
									className="card min-w-80 shadow-xl image-full "
								>
									<figure>
										<Image
											src={`https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg`}
											alt={`Product`}
											fill
											className=" rounded-xl"
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">Product</h2>
										<p>If a dog chews shoes whose shoes does he choose?</p>
										<div className="card-actions justify-end">
											<button className="btn btn-primary btn-ghost hover:border-black">
												See Detail
											</button>
										</div>
									</div>
								</div>
							))}
							<p>haii</p>
						</div>
					</div>
				) : (
					<div className="flex mx-auto  w-screen text-center items-center text-black justify-center">
						<span className="loading loading-spinner loading-lg  mr-2 "></span>
						Loading...
					</div>
				)}
			</div>
		</>
	);
}
