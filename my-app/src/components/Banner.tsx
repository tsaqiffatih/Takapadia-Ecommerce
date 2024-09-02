import Image, { StaticImageData } from "next/image";

interface BannerProps {
  imageUrl: string | StaticImageData;
  altText: string;
}

function BannerPromo({ imageUrl, altText }: BannerProps) {
  return (
    <div className="banner-promo mt-2 mx-2 flex h-96 md:h-1/2 md:w-1/2 lg:h-1/2 lg:w-1/2 ">
      <Image
        src={imageUrl}
        alt={altText}
        style={{ objectFit: "cover" }}
        className="z-0"
      />
    </div>
  );
}

export default BannerPromo;
