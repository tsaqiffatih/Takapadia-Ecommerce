"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./loading";
import Card from "@/components/Card";
import { WishlistData } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import DeleteWislist from "@/components/DeleteWishlist";

export default function Wishlist() {
	const [dataWishlist, setDataWishlist] = useState<WishlistData[] | undefined>(
		[]
	);
	const [loading, setLoading] = useState(true);

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

	async function fetchWishlist(): Promise<void> {
		setLoading(true);
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/wishlist", {
				cache: "no-store",
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message);
			}
			const data = await res.json();
			console.log(data[0].Product);

			setDataWishlist(data);
		} catch (error) {
			if (error instanceof Error && "message" in error) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: error.message,
				});
			}

			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!, pelase try again later.",
			});
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchWishlist();
	}, []);

	if (!dataWishlist) {
		// if user dosent have any wishlist
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<p className="text-2xl font-bold mb-4">Wishlist Kamu Masih Kosong</p>
					{/* Tambahkan link kembali ke halaman utama atau halaman produk */}
					<Link href="/products">
						<p className="text-blue-500 underline">
							Kembali ke Halaman Products
						</p>
					</Link>
				</div>
			</div>
		);
	}
	
	console.log(dataWishlist, "<<<<<<<< dataWishlist");
	

	return (
		<div className=" mt-20">
			<div className="w-screen mx-auto">{loading && <Loading />}</div>
			{/*product name, product thumbnail, description, price  */}
			<div className=" m-2 items-center justify-center max-w-screen ">
				<table className="table border border-black">
					{/* head */}
					<thead>
						<tr className="text-black font-bold">
							<th className="border border-black w-3">No</th>
							<th className="border border-black">Product Name</th>
							<th className="border border-black">Description</th>
							<th className="border border-black">Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{dataWishlist.map((wishlist,index) => (
							<tr key={wishlist.Product?.slug}>
								<td className="border border-black text-black font-semibold text-center">
									{index+1}
								</td>
								<td className="border border-black">
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<Image
													src={wishlist.Product?.thumbnail ?? ""}
													alt={wishlist.Product?.name ?? ""}
													fill
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">{wishlist.Product?.name}</div>
										</div>
									</div>
								</td>
								<td className="border border-black font-semibold">
									{wishlist.Product?.description}
								</td>
								<td className="border border-black font-semibold">{formatCurrency(wishlist.Product?.price)}</td>
								<td className="border border-black text-center">
									<DeleteWislist wishlistId={wishlist._id ?? ''} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
