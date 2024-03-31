import CartItem1 from "./CartItem1";

import {useSelector} from "react-redux";

import {selectCart} from "../cartListSlice";
import CartEmpty from "./CartEmpty";

import {Link} from "react-router-dom";
import OrderInfo from "../../order/components/OrderInfo";

const CartList = () => {
	const cart = useSelector(selectCart);
	const numberOfItems = Object.keys(cart).length;

	return (
		<section className="">
			<h2 className="px-6 text-3xl">Cart [ {numberOfItems}]</h2>
			{numberOfItems ? (
				<div className="flex flex-row flex-wrap items-start justify-center gap-4">
					<div className="flex flex-col items-stretch flex-grow-0 gap-6 border rounded-lg sm:p-4">
						{numberOfItems === 0 && (
							<h1 className="text-6xl">No Items in Cart</h1>
						)}
						{Object.keys(cart).map((id) => {
							return <CartItem1 productId={id} quantity={cart[id]}></CartItem1>;
						})}
					</div>
					<div className="p-4 px-6 bg-gray-100">
						<OrderInfo />
						<Link to={"/checkout"}>
							<button className="w-full px-6 py-3 mb-4 font-medium text-white bg-gray-900 rounded-md">
								Order Now
							</button>
						</Link>
					</div>
				</div>
			) : (
				<CartEmpty />
			)}
		</section>
	);
};

export default CartList;
