import Image from "next/image";

interface BannerProps {
  imageUrl: string;
  altText: string;
}

function BannerPromo({ imageUrl, altText }: BannerProps) {
  return (
    <div className="banner-promo mt-2 mx-2 flex mb-2 h-72 md:h-96 lg:h-72 relative">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
      />
    </div>
  );
}

export default BannerPromo;
