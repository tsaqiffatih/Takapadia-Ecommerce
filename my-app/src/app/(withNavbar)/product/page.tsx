"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "@/components/search";
import { ProductData } from "@/interfaces";

async function getData(
	page: number,
	query: string = ""
): Promise<ProductData[]> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL_API}/products?page=${page}&query=${query}`,
			{ cache: "no-store" }
		);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await res.json();
		return data as ProductData[];
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong");
	}
}

export default function ProductPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState<ProductData[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getData(page, searchTerm);
				setProducts(data);
				setFilteredProducts(data.slice(0, 4));
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();

		return () => setProducts([]);
	}, [page, searchTerm]);

	useEffect(() => {
		if (!searchTerm) {
			setFilteredProducts(products.slice(0, 4));
			setHasMore(true);
			return;
		}

		const filtered = products.filter((product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredProducts(filtered.slice(0, 4));
		setHasMore(true);
	}, [searchTerm, products]);

	const fetchMoreData = () => {
		setTimeout(() => {
			setFilteredProducts((prevProducts) =>
				prevProducts.concat(
					products.slice(prevProducts.length, prevProducts.length + 4)
				)
			);
		}, 500);
	};

	const handleSearch = (query: string) => {
		setSearchTerm(query);
		setProducts([]);
		setPage(1);
	};

	return (
		<>
			<div className="bg-white mr-2 h-24 md:w-full left-0 fixed z-10 top-10">
				<Search onSearch={handleSearch} />
			</div>
			{loading && products.length === 0 && (
				<div className="flex h-screen w-full items-center text-black justify-center">
					<span className="loading loading-spinner loading-lg  mr-2 "></span>
					Loading...
				</div>
			)}

			<InfiniteScroll
				dataLength={filteredProducts.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={null}
				endMessage={
					<p className=" text-center mt-10 text-black">
						<b>Yay! You&apos;ve seen all the products!</b>
					</p>
				}
			>
				<div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center mt-20 md:mt-36 p-2 justify-center">
					{filteredProducts.map((product) => (
						<Card key={product.slug} product={product} />
					))}
				</div>
					<p className=" text-center my-5 text-black">
						<b>Yay! You&apos;ve seen all the products!</b>
					</p>
			</InfiniteScroll>
		</>
	);
}
