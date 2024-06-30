import {useEffect, useRef, useState} from "react";
import Image from "./Image";
import {LuPlay} from "react-icons/lu";

import useIntersection from "../hooks/useIntersection";

const Carousel = () => {
	const images = [
		"https://i.dummyjson.com/data/products/2/1.jpg",
		"https://i.dummyjson.com/data/products/5/2.jpg",
		"https://i.dummyjson.com/data/products/6/3.jpg",
		"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
	];
	const slideContainer = useRef(null);
	const slideShow = useRef(null);

	const dotRef = useRef([]);

	const duration = 2000;
	const i = useRef(0); //index
	const d = useRef(1); //direction
	const [slide, setSlide] = useState(true);

	const isVisible = useIntersection(slideContainer, "-30%");

	function MoveImage(index) {
		const width = slideContainer.current.offsetWidth;
		dotRef.current.forEach((dot) => dot.classList.remove("dot--active"));
		slideShow.current.style.cssText = `translate :${index * width * -1}px;`;
		dotRef.current[index].classList.add("dot--active");
	}
	function startCarousel() {
		const carousel = setInterval(() => {
			const index = i.current;
			MoveImage(index);
			if (index >= images.length - 1) {
				d.current = -1;
			}
			if (index === 0) d.current = 1;
			i.current = index + d.current;
		}, duration);
		return carousel;
	}
	function toggleSlide() {
		setSlide((prev) => !prev);
	}
	useEffect(() => {
		let carousel = null;

		if (slide && isVisible) {
			carousel = startCarousel();
		}

		return () => {
			clearInterval(carousel);
		};
	}, [slide, isVisible]);

	return (
		<section className="min-w-full ">
			<div
				ref={slideContainer}
				className=" relative h-[600px] overflow-hidden    ring-1 ring-black/20"
			>
				<div
					ref={slideShow}
					id="carousel"
					className="flex bg-yellow-100 relative flex-row h-full transition-[translate] duration-500 text-8xl"
				>
					{images.map((image, i) => (
						<Image image={image} index={i} key={i} />
					))}
				</div>
				<div className="absolute font-thin text-8xl text-white/30 hover:text-white/70 left-5 bottom-12">
					<button onClick={toggleSlide}>
						{slide && isVisible ? "" : <LuPlay />}
					</button>
				</div>
				<div className="absolute bottom-0 flex justify-center min-w-full ">
					<div className="flex flex-row gap-4 px-2 rounded-t-full bg-white/10">
						{images.map((image, index) => (
							<div key={index * 100}>
								<div
									ref={(el) => (dotRef.current[index] = el)}
									onClick={() => {
										i.current = index;
										MoveImage(index);
										setSlide(!slide);
									}}
									className={` flex-1 flex justify-center p-4 w-24 relative`}
								>
									<span
										className={`w-2 h-2  rounded-full bg-white/50 transition-all`}
									></span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Carousel;
