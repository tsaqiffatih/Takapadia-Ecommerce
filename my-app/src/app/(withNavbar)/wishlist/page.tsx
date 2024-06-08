"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./loading";
import Card from "@/components/Card";
import { WishlistData } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import DeleteWishlist from "@/components/DeleteWishlist";

export default function Wishlist() {
	const [dataWishlist, setDataWishlist] = useState<WishlistData[] | undefined>(
		[]
	);
	const [loading, setLoading] = useState(true);

	const formatCurrency = (price: number | undefined) => {
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
			const data: WishlistData[] = await res.json();
			setDataWishlist(data);
		} catch (error) {
			let errorMessage = "Something went wrong!, please try again later.";
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: errorMessage,
			});
			console.error("Error fetching wishlist:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchWishlist();
	}, []);

	if (loading) {
		return (
			<div className="w-screen mx-auto">
				<Loading />
			</div>
		);
	}

	if (!dataWishlist?.length) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<p className="text-2xl font-bold mb-4">
						Opps..., Wishlist Kamu Masih Kosong Nih
					</p>
					<div className="flex text-center items-center justify-center">
						<p>yuk, cari produk yang kamu suka </p>
						<Link href="/product">
							<p className="text-blue-500 underline ml-1">disini!</p>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mt-20">
			<p className=" text-center text-2xl font-bold mb-4">My Wishlist</p>
			<div className="m-2 items-center justify-center max-w-screen">
				<table className="table border border-black">
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
						{dataWishlist.map((wishlist, index) => (
							<tr key={wishlist.Product?.slug}>
								<td className="border border-black text-black font-semibold text-center">
									{index + 1}
								</td>
								<td className="border border-black">
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12 relative">
												<Image
													src={wishlist.Product?.thumbnail ?? ""}
													alt={wishlist.Product?.name ?? ""}
													layout="fill"
													objectFit="cover"
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
								<td className="border border-black font-semibold">
									{formatCurrency(wishlist.Product?.price)}
								</td>
								<td className="border border-black text-center">
									<DeleteWishlist
										wishlistId={wishlist._id ?? ""}
										refreshWishlist={fetchWishlist}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
