import {useEffect, useRef} from "react";
import Image from "./Image";

const ProductImage = ({images}) => {
	// const images = [
	// 	"https://i.dummyjson.com/data/products/2/1.jpg",
	// 	"https://i.dummyjson.com/data/products/2/2.jpg",
	// 	"https://i.dummyjson.com/data/products/2/3.jpg",
	// 	"https://i.dummyjson.com/data/products/2/thumbnail.jpg",
	// ];
	const slideContainer = useRef(null);
	const slideShow = useRef(null);

	const dotRef = useRef([]);
	const i = useRef(0);

	function MoveImage(index) {
		const width = slideContainer.current.offsetWidth;
		dotRef.current.forEach((dot) => dot.classList.remove("border-indigo-400"));
		slideShow.current.style.cssText = `translate :${index * width * -1}px;`;
		dotRef.current[index].classList.add("border-indigo-400");
	}
	useEffect(() => {
		MoveImage(0);
	}, []);
	return (
		<section className="flex flex-col gap-2 ">
			<div
				onMouse
				ref={slideContainer}
				className=" relative h-[600px] overflow-hidden "
			>
				<div
					ref={slideShow}
					id="ProductImage"
					className="flex  h-full transition-[translate] duration-500 "
				>
					{images.map((image, i) => (
						<>
							<Image image={image} index={i} key={i} className={"text-8xl"} />
						</>
					))}
				</div>
			</div>
			<div className="flex justify-center min-w-full ">
				<div className="flex flex-row gap-4 ">
					{images.map((image, index) => (
						<div
							ref={(el) => (dotRef.current[index] = el)}
							key={index * index}
							onClick={() => {
								i.current = index;
								MoveImage(index);
							}}
							className={`flex border-[3px] rounded  w-24 h-24 relative overflow-hidden`}
						>
							<Image image={image} index={index} className={"text-2xl"} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProductImage;
