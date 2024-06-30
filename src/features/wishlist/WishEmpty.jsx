import React from "react";
import Button1 from "../../components/Button1";
import {Link} from "react-router-dom";

const WishEmpty = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h2 className="text-2xl font-semibold ">No Products In Wishlist!</h2>
			<h2 className="text-lg ">Keep items here for later purchase</h2>
			<Link to={"/products"} className="m-1">
				<Button1 className="rounded-full">Explore Products</Button1>
			</Link>
		</div>
	);
};

export default WishEmpty;
