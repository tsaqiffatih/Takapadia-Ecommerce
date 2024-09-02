import About from "@/components/About";
import BannerPromo from "@/components/Banner";
import Feature from "@/components/Feauture";
import imageEcommerce from "../../../../public/home_banner.webp";

export default function Home() {
  return (
    <>
      <div className="p-1 mx-auto bg-white bg-opacity-80">
        <div className="md:flex md:justify-center md:items-center">
          <BannerPromo imageUrl={imageEcommerce} altText="banner-promo" />
          <About />
        </div>
        <Feature />
      </div>
    </>
  );
}
