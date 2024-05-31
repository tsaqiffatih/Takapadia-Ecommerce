import Link from "next/link";
import { cookies, headers } from "next/headers";
import LogoNavbar from "./ComponentLogoNavbar";
import CartDropdown from "./ComponentCartDropdown";
import UserDropdown from "./ComponentUserDropdown";


export default function Navbar() {
	const cookiesAuth = headers().get("cookie") || "";
	const isLogedIn = cookiesAuth.includes("Authorization");
	const token = cookies().get("Authorization");
	

	return (
		<>
			<div className="navbar fixed w-full top-0 mb-10 border-t border-b bg-white z-20 border-black">
				<LogoNavbar />
				<div className="navbar-center space-x-1">
					<Link
						href="/"
						className="text-black btn btn-ghost rounded-sm hover:bg-transparent hover:border hover:border-black font-bold font-fomo"
					>
						Home
					</Link>
					<span className="mx-2"></span>
					<Link
						href="/product"
						className="text-black btn btn-ghost rounded-sm hover:bg-transparent hover:border hover:border-black font-bold font-fomo"
					>
						Products
					</Link>
					<span className="mx-2"></span>
					<Link
						href="/wishlist"
						className="text-black btn btn-ghost rounded-sm hover:bg-transparent hover:border hover:border-black font-bold font-fomo"
					>
						Wishtlist
					</Link>
				</div>
				<div className="navbar-end">
					<CartDropdown />
					<UserDropdown isLogedIn={isLogedIn} accessToken={token?.value} />
				</div>
			</div>
		</>
	);
}
