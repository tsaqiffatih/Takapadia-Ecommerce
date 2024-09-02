"use client";
import { truncateSentence } from "@/actions/TruncateSentence";
import { ProductData } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
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
	console.log(products);

	return (
		<>
			<div className="mt-3">
				<p className="font-bold text-4xl mb-1">Featured Products : </p>
				{products.length != 0 ? (
					<div className="m-2 mb-1 overflow-x-auto scroll-container">
						<div className="flex space-x-4 ">
							{products.map((product, index) => (
								<div
									key={index}
									className="card min-w-56 md:min-w-80 image-full "
								>
									<figure>
										<Image
											src={
												product.thumbnail
													? product.thumbnail
													: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
											}
											alt={product.name}
											fill
											className=" rounded-xl"
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">{product.name}</h2>
										<p>
											{truncateSentence(
												product.description ? product.description : ""
											)}
										</p>
										<div className="card-actions justify-end">
											<button className="btn btn-primary btn-ghost hover:border-black">
												<Link href={`/product/${product.slug}`}>
													See Detail
												</Link>
											</button>
										</div>
									</div>
								</div>
							))}
							<div className="flex flex-grow text-center items-center justify-center">
								<button className=" text-lg rounded-lg font-bold border hover:bg-black p-1 border-black hover:text-white  ">
									<Link href="/product" >
									See All Product
									</Link>
								</button>
							</div>
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
