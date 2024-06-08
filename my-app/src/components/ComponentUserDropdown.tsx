"use client";
import Link from "next/link";
import { handleLogout } from "@/actions/Logout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
				<button
					onClick={async () => {
						const result = await Swal.fire({
							icon: "question",
							title: "Anda Yakin Mau Keluar?",
							showCancelButton: true,
							confirmButtonText: "Ya",
							cancelButtonText: "Tidak",
						});

						if (result.isConfirmed) {
							handleLogout();
						} else {
							console.log("gak jadi");
						}
					}}
					className="btn btn-ghost border hover:bg-black hover:text-white border-black bg-transparent"
				>
					Logout
				</button>
			) : (
				<button className="btn btn-ghost border hover:bg-black hover:text-white border-black bg-transparent">
					<Link href={"/login"}>Login</Link>
				</button>
			)}
		</>
	);
}
