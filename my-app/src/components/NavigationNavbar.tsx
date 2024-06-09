"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import UserDropdown from "./ComponentUserDropdown";

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
		"text-black btn btn-ghost rounded-lg hover:bg-transparent hover:border hover:border-black font-bold font-fomo";
	const activeStyle = "bg-black text-white hover:text-black";

	return (
		<>
			<li>
				<Link
					href="/"
					className={`${styleLink} ${pathname === "/" ? activeStyle : ""}`}
				>
					Home
				</Link>
			</li>
			<li>
				<Link
					href="/product"
					className={`${styleLink} ${
						pathname === "/product" ? activeStyle : ""
					}`}
				>
					Products
				</Link>
			</li>
			<li>
				<Link
					href="/wishlist"
					className={`${styleLink} ${
						pathname === "/wishlist" ? activeStyle : ""
					}`}
					onClick={handleWishlistClick}
				>
					Wishlist
				</Link>
			</li>
			{/* 
				<span className="mx-2"></span>
				
				<span className="mx-2"></span> */}
		</>
	);
}
