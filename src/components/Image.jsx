import {useState} from "react";
import {LuImage} from "react-icons/lu";

const Image = ({image, index, className}) => {
	const [loaded, setLoaded] = useState(false);
	return (
		<div
			className={`min-w-full basis-full  relative flex-1 h-[inherit] ${className}`}
			key={index}
		>
			<span
				className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-indigo-300 ring-b-1 ring-indigo-300 "
				style={{visibility: !loaded ? "visible" : "hidden"}}
			>
				<LuImage className="hover:animate-pulse" />
			</span>
			<img
				loading="eager"
				src={image}
				style={{visibility: loaded ? "visible" : "hidden"}}
				className="object-cover w-full h-full transition-all"
				alt={`Product-${index}`}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
};

export default Image;
