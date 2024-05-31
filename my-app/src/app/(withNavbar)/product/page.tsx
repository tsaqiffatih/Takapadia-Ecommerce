"use client";
import Card from "@/components/Card";
import Search from "@/components/search";
import { typeProduct } from "@/validators/productValidator";
import { useEffect, useState } from "react";

async function getData(): Promise<typeProduct[]> {
	try {
		const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/products", {
			cache: "no-cache",
		});

		if (!res.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error("Failed to fetch data");
		}

		const data = await res.json();
		return data as typeProduct[];
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong");
	}
}

export default function ProductPage() {
	const [products, setProducts] = useState<typeProduct[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const data = await getData();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<div>
			<div className=" bg-white mr-2 h-24 md:w-full left-0 fixed z-10 top-10">
				<Search />
			</div>
			{loading ? (
				<div className="flex h-screen w-full items-center text-black justify-center">
					<span className="loading loading-spinner loading-lg  mr-2 "></span>
					Loading...
				</div>
			) : (
				<div className="flex mt-36 space-x-2 flex-wrap justify-center">
					{products.map((product) => (
						<Card key={product.slug} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
