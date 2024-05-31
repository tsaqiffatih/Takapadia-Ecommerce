import Link from "next/link";

export default function ToHome() {
	return (
		<>
			<button className="btn btn-outline text-black border-black hover:bg-green-800 absolute left-3 bottom-4">
                <p >{"<"}</p>
				<Link href={"/"} >Back to Home</Link>
			</button>
		</>
	);
}
