import Image from "next/image";
import logo from "../../public/tokped_hitam_putih.png";
import Link from "next/link";

export default function LogoNavbar() {
	return (
		<>
			<Link
				href="/"
				className=" min-w-40 items-center justify-center flex font-bold ml-1 text-black text-base lg:text-xl "
			>
				<Image src={logo} alt="Logo" className="h-10 w-10 mr-0" />
				Taka-pedia
			</Link>
		</>
	);
}
