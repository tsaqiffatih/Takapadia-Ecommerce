import { ObjectId } from "mongodb";

export default function DeleteWislist({
	wishlistId,
}: {
	wishlistId: string | ObjectId;
}) {
	return (
		<>
			<button
				className="btn border border-black btn-sm"
				onClick={() => {
					console.log(wishlistId, "<<<<<<<< wishlistId");
				}}
			>
				Delete
			</button>
		</>
	);
}
