"use client";
import Link from "next/link";
import { handleLogout } from "@/actions/Logout";
import { useEffect, useState } from "react";

export default function UserDropdown({
	isLogedIn,
	accessToken,
}: {
	isLogedIn: boolean;
	accessToken: string | undefined;
}) {
	// feature on going v
	const [name, setName] = useState<string>("");
	// function to create initials from name
	const getInitials = (name: string) => {
		const firstLetter = name[0].charAt(0).toUpperCase();
		return firstLetter;
	};

	return (
		<>
			{isLogedIn ? (
				<div className="dropdown dropdown-end shadow-2xl">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="avatar placeholder">
							<div className="bg-neutral text-neutral-content rounded-full w-10">
								<span className="text-base">UI</span>
							</div>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow border border-black bg-base-100 rounded-md w-52"
					>
						<>
							<li>
								<a className="justify-between font-bold">Profile</a>
							</li>
							<li>
								<a className="font-bold">My Wishlist</a>
							</li>
							<li>
								<button
									onClick={() => {
										handleLogout();
									}}
									className="btn-ghost font-bold"
								>
									Logout
								</button>
							</li>
						</>
					</ul>
				</div>
			) : (
				<button className="btn border border-black bg-transparent">
					<Link href={"/login"}>Login</Link>
				</button>
			)}
		</>
	);
}
