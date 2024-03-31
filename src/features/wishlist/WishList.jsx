import React from "react";
import WishItem from "./WishItem";
import {useSelector} from "react-redux";
import {selectWish} from "./wishListSlice";
import WishEmpty from "./WishEmpty";

const WishList = () => {
	const wishlist = useSelector(selectWish);
	const numberofItems = Object.keys(wishlist).length;

	return (
		<>
			<section className="flex flex-row flex-wrap items-stretch justify-center gap-8 p-8">
				{numberofItems ? (
					<div>
						{Object.keys(wishlist).map((key) => {
							return (
								<WishItem productId={key} quantity={wishlist[key]}></WishItem>
							);
						})}
					</div>
				) : (
					<WishEmpty />
				)}
			</section>
		</>
	);
};

export default WishList;
