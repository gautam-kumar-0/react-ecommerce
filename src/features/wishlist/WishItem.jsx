import React from "react";
import Button1 from "../../components/Button1";

import Rating from "../../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../ProductsList/productListSlice";
import {removeW} from "./wishListSlice";
const WishItem = ({productId}) => {
	const product = useSelector((state) => getProductById(state, productId));
	const dispatch = useDispatch();
	return (
		<div className="flex flex-wrap  gap-2 p-2 pt-4 overflow-hidden bg-white shadow-sm border  max-w-[600px] rounded-xl font-geo ring-0.5 ring-violet-400">
			<h2 className="px-2 text-2xl font-light text-gray-600 basis-full line-clamp-1">
				{product?.title}
			</h2>

			<div className="flex justify-between gap-4 p-2 md:basis-2/3">
				<img
					src={product.thumbnail}
					alt=""
					className="w-32 aspect-square md:aspect-video md:w-48 rounded-xl"
				/>
				<div className="text-sm font-light text-gray-500">
					<p className="">
						Brand: <span className="text-gray-600">{product.brand}</span>
					</p>
					<p className="">
						Category: <span className="text-gray-600">{product.category}</span>
					</p>
					<p className="flex-grow mt-1 font-extralight line-clamp-3">
						{product.description}
					</p>
				</div>
			</div>
			<div className="flex flex-row flex-wrap items-stretch justify-between gap-4 p-4 md:basis-full md:order-2 sm:basis-1/2 sm:flex-col sm:gap-2 md:flex-row">
				<div className="flex gap-3 md:basis-auto">
					<Rating rating={product.rating} />
				</div>

				<div className="flex justify-between gap-3 md:justify-end">
					<span className="text-lg text-indigo-400">Price:</span>
					<span className="text-xl text-emerald-400">${product.price}</span>
				</div>
			</div>
			<div className=" md:order-1 flex flex-col items-stretch justify-between gap-4 sm:gap-8 text-xl  min-[470px]:flex-row sm:flex-col sm:basis-auto basis-full lg:basis-auto min-w-fit ml-auto py-2 sm:p-4">
				<Button1
					onClick={() => dispatch(removeW({id: product.id}))}
					className={`rounded-full hover:bg-red-400  bg-none shadow-none`}
				>
					Remove
				</Button1>
				<Button1
					className={`rounded-full hover:bg-green-500  bg-none shadow-none`}
				>
					<span className="flex items-center justify-center gap-1">
						Buy Now
					</span>
				</Button1>
			</div>
		</div>
	);
};

export default WishItem;
