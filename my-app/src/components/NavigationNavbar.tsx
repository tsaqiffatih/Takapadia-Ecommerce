"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function NavigationNavbar({
	isLogedIn,
}: {
	isLogedIn: boolean;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const handleWishlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (!isLogedIn) {
			Swal.fire({
				icon: "warning",
				title: "Oppss..",
				text: "You need to log in to access your wishlist",
				confirmButtonText: "Login",
			}).then((result) => {
				if (result.isConfirmed) {
					router.push("/login");
				}
			});
		} else {
			router.push("/wishlist");
		}
	};

	const styleLink =
		"text-black btn btn-ghost rounded rounded-lg hover:bg-transparent hover:border hover:border-black font-bold font-fomo";
	const activeStyle = "bg-black text-white hover:text-black";

	return (
		<div className="navbar-center space-x-1">
			<Link
				href="/"
				className={`${styleLink} ${pathname === "/" ? activeStyle : ""}`}
			>
				Home
			</Link>
			<span className="mx-2"></span>
			<Link
				href="/product"
				className={`${styleLink} ${pathname === "/product" ? activeStyle : ""}`}
			>
				Products
			</Link>
			<span className="mx-2"></span>
			<Link
				href="/wishlist"
				className={`${styleLink} ${
					pathname === "/wishlist" ? activeStyle : ""
				}`}
				onClick={handleWishlistClick}
			>
				Wishlist
			</Link>
		</div>
	);
}
