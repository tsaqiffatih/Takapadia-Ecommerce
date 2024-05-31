import About from "@/components/About";
import BannerPromo from "@/components/Banner";
import Feature from "@/components/Feauture";

export default function Home() {
	return (
		<>
			<div className="p-1 mx-auto scroll-smooth bg-white h-screen w-screen overflow-y-auto overflow-x-hidden bg-opacity-80">
				<BannerPromo
					imageUrl="https://cdn.dribbble.com/userupload/12817682/file/original-1b6c77f6c4af895401640e95358abb8b.jpg?resize=1068x400"
					altText="banner-promo"
				/>
				<About />
				<Feature />
			</div>
		</>
	);
}

