import React, {useEffect, useRef, useState} from "react";
import Image from "./Image";
const ProductImages = ({images, start, setStart, className}) => {
	const newImages = [images[images.length - 1], ...images];
	const duration = 500;

	const dotRef = useRef([]);

	const containerRef = useRef(null);
	const index = useRef(0);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [slideHover, setSlideHover] = useState(false);

	const slideShow = () => {
		return setInterval(() => {
			let newIndex = index.current >= images.length ? 0 : index.current + 1;
			index.current = newIndex;
			setCurrentIndex(newIndex);
		}, duration * 3);
	};

	useEffect(() => {
		let slide = start ? slideShow() : null;
		return () => {
			if (slide) clearInterval(slide);
		};
	}, [start]);

	useEffect(() => {
		dotRef.current.forEach((dot) => dot.classList.remove("dot--active"));

		const transition = currentIndex === 0 && start ? "0ms" : `${duration}ms`;
		const translate = `translateX(-${currentIndex * 100}%)`;
		const activeIndex = currentIndex === images.length ? 0 : currentIndex;

		containerRef.current.style.transition = transition;

		containerRef.current.style.transform = translate;

		dotRef.current[activeIndex].classList.add("dot--active");

		if (currentIndex === images.length) {
			setTimeout(() => {
				setCurrentIndex(0);
			}, duration);
		}
	}, [currentIndex, start, images.length]);

	return (
		<>
			<div
				onMouseOver={() => setSlideHover(true)}
				onMouseLeave={() => setSlideHover(false)}
				onClick={() => setStart(false)}
				className={`relative flex min-w-full overflow-hidden  ${className} `}
			>
				<div
					ref={containerRef}
					className="flex min-w-full transition-transform "
				>
					{newImages.map((image, i) => (
						<Image image={image} index={i} />
					))}
				</div>
				<div
					className={`absolute ${
						start || slideHover ? "bottom-0" : "-bottom-full"
					} left-0 transition-all w-full flex justify-center backdrop-blur-sm bg-gradient-to-b from-transparent to-black/10 dark:from-violet-400/30  overflow-hidden`}
				>
					{newImages.map((image, i) => (
						<div
							className={`flex-1 flex justify-center py-3 px-1 ${
								i === images.length ? "hidden" : ""
							}`}
							key={i}
							ref={(el) => (dotRef.current[i] = el)}
							onClick={() => {
								index.current = i;
								setCurrentIndex(i);
							}}
						>
							<span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
						</div>
					))}
				</div>
				{/* <h1 className="absolute">{index.current * 100}</h1> */}
			</div>
			{/* <button
				className="p-2 m-4 text-lg border border-fuchsia-500"
				onClick={() => setStart(!start)}
			>
				Slide: {`${start}`}
			</button> */}
		</>
	);
};

export default ProductImages;
