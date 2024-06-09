"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./loading";
import Image from "next/image";
import Link from "next/link";
import DeleteWishlist from "@/components/DeleteWishlist";
import { WishlistData } from "@/interfaces";
import { truncateSentence } from "@/actions/TruncateSentence";

export default function Wishlist() {
    const [dataWishlist, setDataWishlist] = useState<WishlistData[] | undefined>([]);
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
                        Opps..., Your wishlist is still empty
                    </p>
                    <div className="flex text-center items-center justify-center">
                        <p>Come on, find products you like </p>
                        <Link href="/product">
                            <p className="text-blue-500 underline ml-1">here!</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-20 p-4">
            <p className="text-center text-2xl font-bold mb-4">My Wishlist</p>
            <div className="max-w-screen mx-auto">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-black">
                        <thead>
                            <tr className="text-black font-bold">
                                <th className="border border-black p-2">No</th>
                                <th className="border border-black p-2">Product Name</th>
                                <th className="border border-black p-2">Description</th>
                                <th className="border border-black p-2">Price</th>
                                <th className="border border-black p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataWishlist.map((wishlist, index) => (
                                <tr key={wishlist.Product?.slug} className="text-black">
                                    <td className="border border-black text-center p-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-black p-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 relative">
                                                <Image
                                                    src={wishlist.Product?.thumbnail ?? ""}
                                                    alt={wishlist.Product?.name ?? ""}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold">{wishlist.Product?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-black p-2">
                                        {truncateSentence(wishlist.Product?.description ?? "")}
                                    </td>
                                    <td className="border border-black p-2">
                                        {formatCurrency(wishlist.Product?.price)}
                                    </td>
                                    <td className="border border-black text-center p-2">
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
        </div>
    );
}
