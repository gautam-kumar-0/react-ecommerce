import React from "react";
import Button1 from "../../../components/Button1";
import {Link} from "react-router-dom";

const CartEmpty = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h2 className="text-2xl font-semibold ">No Products In Cart!</h2>
			<h2 className="text-lg ">Keep shoppping</h2>
			<Link to={"/products"} className="m-1">
				<Button1 className="rounded-full">Explore Products</Button1>
			</Link>
		</div>
	);
};

export default CartEmpty;
