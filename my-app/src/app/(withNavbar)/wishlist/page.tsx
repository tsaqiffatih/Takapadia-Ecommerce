"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./loading";
import Card from "@/components/Card";
import { WishlistData } from "@/interfaces";

export default function Wishlist() {
	const [dataWishlist, setDataWishlist] = useState<WishlistData[]>([]);
	const [loading, setLoading] = useState(true);

	async function fetchWishlist(): Promise<void> {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:3001/wishlist", {
				cache: "no-store",
			});
			if (!res.ok) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong. Data could not be fetched!",
				});
				return; // Kembali setelah menampilkan pesan kesalahan
			}
			const data = await res.json();
			setDataWishlist(data);
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "An error occurred while fetching the data.",
			});
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchWishlist();
	}, []);

	return (
		<div className="h-screen">
			<div>
				<p>Ini halaman wishlist</p>
			</div>
			{loading ? (
				<Loading />
			) : (
				<div>
					{dataWishlist.length === 0 ? (
						<p>Your wishlist is empty.</p>
					) : (
						dataWishlist.map((wishlist) => (
							<Card key={wishlist._id} product={wishlist.product} />
						))
					)}
				</div>
			)}
		</div>
	);
}
