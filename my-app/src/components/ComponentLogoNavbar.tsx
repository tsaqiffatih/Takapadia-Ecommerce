import Image from 'next/image';
import logo from "../../public/tokped_hitam_putih.png";

export default function LogoNavbar() {
  return (
    <>
      <div className="navbar-start ml-2">
        <Image
          src={logo}
          alt=""
          className="w-auto h-auto max-h-12 max-w-full"
        />
        <a href="#" className="btn btn-ghost hover:bg-transparent ml-0 text-black text-xl ">Taka-pedia</a>
      </div>
    </>
  );
}
