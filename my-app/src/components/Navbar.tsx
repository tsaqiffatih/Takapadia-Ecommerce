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
			<div className="drawer bg-white fixed z-50">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content h-16 flex flex-col top-0 border border-y-black">
					{/* Navbar */}
					<div className="w-full navbar bg-bg-white">
						<div className="flex-none navbar-start md:hidden">
							<label
								htmlFor="my-drawer-3"
								aria-label="open sidebar"
								className="btn btn-square btn-ghost"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block w-6 h-6 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							</label>
						</div>
						<div className="navbar-start hidden md:flex ml-2">
							<LogoNavbar />
						</div>
						<div className="flex-none hidden navbar-center md:flex lg:space-x-1">
							<ul className="menu menu-horizontal">
								<NavigationNavbar isLogedIn={isLogedIn} />
							</ul>
						</div>
						<div className="navbar-end md:navbar-end">
							<UserDropdown isLogedIn={isLogedIn} />
						</div>
					</div>
					{/* Page content here */}
				</div>
				<div className="drawer-side ">
					<label
						htmlFor="my-drawer-3"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu w-72 border min-h-full border-black rounded rounded-br-xl bg-white">
						{/* Sidebar content here */}
							<div className="hover:bg-transparent w-full flex items-center justify-center mx-auto">
								<LogoNavbar />
							</div>
								<span className="border border-b-2 border-black my-5" ></span>
						<NavigationNavbar isLogedIn={isLogedIn} />
					</ul>
				</div>
			</div>
		</>
	);
}
