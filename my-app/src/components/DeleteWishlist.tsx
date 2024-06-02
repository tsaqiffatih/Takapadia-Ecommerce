import { ObjectId } from "mongodb";
import Swal from "sweetalert2";

export interface DeleteWishlistProps {
	wishlistId: string | ObjectId;
	refreshWishlist: () => Promise<void>;
}

export default function DeleteWislist({
	wishlistId,
	refreshWishlist,
}: DeleteWishlistProps) {
	async function handleRemoveWishlist(wishlistId: string | ObjectId) {
		try {			
			const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/wishlist", {
				method: "delete",
				body: JSON.stringify({ wishlistId }),
				headers: {
					"content-type": "application/json",
				},
				cache: "no-cache",
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			Swal.fire({
				icon: "success",
				// title: "Product Added to Wishlist",
				text: data.message,
			});
			
			refreshWishlist()
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
		}
	}

	return (
		<>
			<button
				className="btn border border-black btn-sm"
				onClick={() => {
					handleRemoveWishlist(wishlistId)
				}}
			>
				Delete
			</button>
		</>
	);
}
