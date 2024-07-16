import {useState} from "react";

import Image from "../../../components/Image";

import Rating from "../../../components/Rating";
import {Link} from "react-router-dom";

const ProductCard2 = ({product, className}) => {
	const [liked, setLiked] = useState(true);
	return (
		<div className={className}>
			<div className="flex flex-col justify-start h-full pb-2 overflow-hidden bg-white border rounded-md dark::bg-white/5 dark:border-white/20">
				<div className="relative text-6xl bg-gray-100 h-60">
					<Image image={product.thumbnail} index={0} />
				</div>
				<div className="px-3 text-gray-800 dark:text-gray-100">
					<h1 className="py-1 text-2xl font-semibold line-clamp-1 ">
						{product.title}
					</h1>
				</div>

				<Link to={`/product/${product.id}`}>
					<p className="px-3 py-1 text-lg text-gray-600 hover:underline hover:text-violet-600 dark:text-gray-200 line-clamp-2 ">
						{product.description}
					</p>
				</Link>
				<h2 className="flex flex-row items-end justify-between flex-grow px-3 mt-1 text-lg ">
					<Rating rating={product.rating} key={product.rating * 2} />
					<span className="text-2xl font-semibold ">
						<span className="mr-1 font-light font-jose bg-none text-emerald-400">
							₹
						</span>
						{product.price}
					</span>
				</h2>
			</div>
		</div>
	);
};

export default ProductCard2;
