import Link from "next/link";
import { cookies, headers } from "next/headers";
import LogoNavbar from "./ComponentLogoNavbar";
import CartDropdown from "./ComponentCartDropdown";
import UserDropdown from "./ComponentUserDropdown";
import NavigationNavbar from "./NavigationNavbar";


export default function Navbar() {
	const cookiesAuth = headers().get("cookie") || "";
	const isLogedIn = cookiesAuth.includes("Authorization");
	const token = cookies().get("Authorization");
	

	return (
		<>
			<div className="navbar fixed w-full top-0 mb-10 border-t border-b bg-white z-20 border-black">
				<LogoNavbar />
				<NavigationNavbar isLogedIn={isLogedIn} />
				<div className="navbar-end">
					<CartDropdown />
					<UserDropdown isLogedIn={isLogedIn} accessToken={token?.value} />
				</div>
			</div>
		</>
	);
}
