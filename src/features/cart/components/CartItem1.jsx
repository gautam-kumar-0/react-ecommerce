import React from "react";

import {LuMinus, LuPlus} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../../ProductsList/productListSlice";
import {HashLoader} from "react-spinners";
import {
	addToCartAsync as add,
	decrementCartAsync as decrement,
	removeFromCartAsync as remove,
} from "../../cart/cartListSlice";

import useAuth from "../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
const CartItem1 = ({productId, quantity}) => {
	const product = useSelector((state) => getProductById(state, productId));
	const dispatch = useDispatch();
	const userId = useAuth().id;
	const navigate = useNavigate();
	const item = {product: product?.id, user: userId};
	if (!product || !userId) {
		return <HashLoader className="text-4xl" />;
	}

	return (
		<div className="border-b flex items-start  gap-4 p-2  px-4 overflow-hidden bg-white     max-w-[600px]  ">
			<div className="flex flex-shrink-0 ">
				<img
					src={product.thumbnail}
					alt={product.title}
					className="w-24 rounded sm:w-32 aspect-[1/0.9] "
				/>
			</div>
			<div className="flex flex-col self-stretch justify-between py-1">
				<h4 className="text-lg font-semibold tracking-loose dark:text-gray-100 line-clamp-1">
					{product.title}
				</h4>
				<p className="flex flex-row overflow-hidden text-gray-400 leading-1 text-md sm:flex-col line-clamp-2 dark:text-gray-400">
					<span>{product.brand}</span>
					<span className="inline sm:inline-block">{product.category}</span>
				</p>
				<div className="flex flex-row flex-wrap items-end flex-grow gap-4 pr-3 md:gap-8 md:flex-nowrap ">
					<div className="flex justify-between gap-3 md:justify-end">
						<span className="text-lg font-semibold">
							${product.price * quantity}
						</span>
					</div>
					<div className="flex items-center justify-between gap-4">
						<p className="hidden text-gray-500 sm:inline-block">Quantity </p>
						<div className="flex items-center gap-2 ">
							<button
								onClick={() => {
									if (!userId) navigate("/login");
									dispatch(add(item));
								}}
								className="text-xl text-gray-400 border rounded-sm dark:border-white/10 hover:text-emerald-400"
							>
								<LuPlus />
							</button>
							<span className="text-indigo-600 ">{quantity}</span>
							<button
								onClick={() => {
									if (quantity <= 1) dispatch(remove(item));
									dispatch(decrement(item));
								}}
								className="text-xl text-gray-400 border rounded-sm dark:border-white/10 hover:text-rose-400"
							>
								<LuMinus />
							</button>
						</div>
					</div>

					<span
						className="ml-auto text-indigo-500 transition hover:underline hover:text-red-600"
						onClick={() => {
							dispatch(remove(item));
						}}
					>
						Remove
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartItem1;
