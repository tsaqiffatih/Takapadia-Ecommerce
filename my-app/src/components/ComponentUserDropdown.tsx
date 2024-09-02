"use client";
import Link from "next/link";
import { handleLogout } from "@/actions/Logout";
import { useState } from "react";
import Swal from "sweetalert2";

export default function UserDropdown({ isLogedIn }: { isLogedIn: boolean }) {
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
              title: "Are you sure want to Logout?",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
            });

            if (result.isConfirmed) {
              handleLogout();
            } else {
              console.log("Logout cancelled");
            }
          }}
          className="btn btn-ghost border hover:bg-black hover:text-white border-black bg-transparent"
        >
          Logout
        </button>
      ) : (
        <button className="btn btn-ghost border hover:bg-black hover:text-white border-black bg-transparent">
          <Link href="/login">Login</Link>
        </button>
      )}
    </>
  );
}
