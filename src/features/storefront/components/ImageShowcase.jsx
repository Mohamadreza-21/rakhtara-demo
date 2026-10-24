import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getShowcaseImages } from "../../../services/showcase";
import { keys } from "../../../lib/query/keys";
import "swiper/css";
import "swiper/css/pagination";
import "./ImageShowcase.css";
import { withBase } from "../../../utils/assets";

const FALLBACK_IMAGES = [
	{
		id: "fallback-1",
		src: withBase("/images/showcase-fashion.svg"),
		alt: "پوشاک رخت‌آرا",
	},
	{
		id: "fallback-2",
		src: withBase("/images/showcase-bag.svg"),
		alt: "کیف چرم",
	},
	{
		id: "fallback-3",
		src: withBase("/images/showcase-glasses.svg"),
		alt: "عینک آفتابی",
	},
];

export default function ImageShowcase() {
	const { data } = useQuery({ queryKey: keys.showcase, queryFn: getShowcaseImages });
	const images = data?.length > 0 ? data : FALLBACK_IMAGES;
	const swiperRef = useRef(null);

	return (
		<section className="py-16 bg-camel">
			<div className="max-w-4xl mx-auto px-6">
				<div className="relative">
					<Swiper
						modules={[Pagination, Autoplay]}
						dir="rtl"
						loop={images.length > 1}
						autoplay={{ delay: 3500, disableOnInteraction: false }}
						pagination={{ clickable: true }}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						className="showcase-swiper w-full h-[280px] md:h-[420px] rounded-[2rem] shadow-2xl overflow-hidden"
					>
						{images.map((image) => (
							<SwiperSlide key={image.id ?? image.src}>
								<img
									src={image.src}
									loading="lazy"
									alt={image.alt}
									className="w-full h-full object-cover"
								/>
							</SwiperSlide>
						))}
					</Swiper>

					{images.length > 1 && (
						<>
							<button
								type="button"
								onClick={() => swiperRef.current?.slidePrev()}
								aria-label="عکس قبلی"
								className="showcase-nav-btn cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 z-20 w-11 h-11 rounded-full bg-forest-dark/80 hover:bg-forest-dark text-camel flex items-center justify-center shadow-lg backdrop-blur-sm transition"
							>
								<ChevronRight size={20} />
							</button>
							<button
								type="button"
								onClick={() => swiperRef.current?.slideNext()}
								aria-label="عکس بعدی"
								className="showcase-nav-btn cursor-pointer absolute top-1/2 -translate-y-1/2 left-3 z-20 w-11 h-11 rounded-full bg-forest-dark/80 hover:bg-forest-dark text-camel flex items-center justify-center shadow-lg backdrop-blur-sm transition"
							>
								<ChevronLeft size={20} />
							</button>
						</>
					)}

					<div className="absolute -bottom-6 -right-6 z-10 w-24 h-24 rounded-full border-4 border-camel bg-forest-dark flex items-center justify-center text-center p-3 -rotate-[8deg] shadow-lg">
						<span className="font-black leading-4 text-xs text-camel">
							دوخت
							<br />
							دست
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
