'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function NavigationNavbar({isLogedIn}: {isLogedIn: boolean}) {
    const router = useRouter()

    const handleWishlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation
        if (!isLogedIn) {
          Swal.fire({
            icon: "warning",
            title: "Authentication Required",
            text: "You need to log in to access the wishlist",
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

    const styleLink = "text-black btn btn-ghost rounded-sm hover:bg-transparent hover:border hover:border-black font-bold font-fomo"
    

	return (
		<div className="navbar-center space-x-1">
			<Link
				href="/"
				className={styleLink}
			>
				Home
			</Link>
			<span className="mx-2"></span>
			<Link
				href="/product"
				className={styleLink}
			>
				Products
			</Link>
			<span className="mx-2"></span>
			<Link
				href="/wishlist"
				className={styleLink}
                onClick={handleWishlistClick}
			>
				Wishtlist
			</Link>
		</div>
	);
}
