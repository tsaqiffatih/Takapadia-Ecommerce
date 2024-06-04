import Image from "next/image";

interface BannerProps {
  imageUrl: string;
  altText: string;
}

function BannerPromo({ imageUrl, altText }: BannerProps) {
  return (
    <div className="banner-promo mt-2 mx-2 flex mb-2 h-72">
      <Image
        src={imageUrl} //https://cdn.dribbble.com/userupload/12817682/file/original-1b6c77f6c4af895401640e95358abb8b.jpg?resize=1068x400
        alt={altText}
        width={1200}
        height={400}
        layout="responsive"
        className="z-0"
      />
    </div>
  );
}

export default BannerPromo;
