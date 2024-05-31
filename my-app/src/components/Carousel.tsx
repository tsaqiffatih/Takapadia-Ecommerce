export default function Carousel() {
    // Data gambar dan tombol navigasi
    const slides = [
        {
            id: 'slide1',
            imageUrl: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg',
            prevSlide: '#slide4',
            nextSlide: '#slide2',
        },
        {
            id: 'slide2',
            imageUrl: 'https://cdn.dribbble.com/userupload/12479933/file/original-8824805f3f6508faf91189cbc924a08b.png?resize=752x251&vertical=center',
            prevSlide: '#slide1',
            nextSlide: '#slide3',
        },
        {
            id: 'slide3',
            imageUrl: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg',
            prevSlide: '#slide2',
            nextSlide: '#slide4',
        },
        {
            id: 'slide4',
            imageUrl: 'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg',
            prevSlide: '#slide3',
            nextSlide: '#slide1',
        },
    ];

    return (
        <>
            <div className="carousel justify-content-center w-full h-72">
                {slides.map((slide, index) => (
                    <div key={index} id={slide.id} className="carousel-item relative w-full">
                            <img src={slide.imageUrl} className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2 ">
                            <a href={slide.prevSlide} className="btn hover:btn-circle text-black bg-white rounded-white">
                                ❮
                            </a>
                            <a href={slide.nextSlide} className="btn hover:btn-circle text-black bg-white rounded-white">
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
