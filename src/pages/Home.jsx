import React from "react";
import {selectAllProducts} from "../features/ProductsList/productListSlice";
import Carousel from "../components/Carousel";
import {LuListRestart, LuSearch, LuTrendingUp} from "react-icons/lu";
import ProductCard from "../features/ProductsList/components/ProductCard";

import ProductCard2 from "../features/ProductsList/components/ProductCard2";
import {TiFlash} from "react-icons/ti";
import ProductCard3 from "../features/ProductsList/components/ProductCard3";
import Button1 from "../components/Button1";
import {useSelector} from "react-redux";
import {ClipLoader} from "react-spinners";
import useCart from "../hooks/useCart";
import {selectWish} from "../features/wishlist/wishListSlice";

const Home = () => {
	const products = useSelector(selectAllProducts);
	const {products: cartProducts} = useCart();
	const wishlist = useSelector(selectWish);
	if (products.length === 0) {
		return (
			<div className="flex mt-12 font-bold place-content-center text-8xl">
				<ClipLoader />
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-12 ">
			<Carousel />
			<section className="flex flex-col gap-6 px-3 py-8 bg-green-50 ">
				<h2 className="flex gap-3 text-4xl ">
					<span>Trending Products</span>
					<span>
						<LuTrendingUp color={"springgreen"} />
					</span>
				</h2>
				<div className="grid grid-cols-4 gap-4">
					<ProductCard2 product={products[0]} />
					<ProductCard2 product={products[1]} />
					<ProductCard2 product={products[2]} />
					<ProductCard2 product={products[3]} />
				</div>
			</section>
			<section className="flex flex-col gap-6 py-8 bg-orange-50 ">
				<h2 className="flex gap-3 px-6 text-4xl">
					<span>Start Where you left</span>
					<span>
						<LuListRestart color={"orange"} />
					</span>
				</h2>
				<div className="flex flex-col gap-2 overflow-hidden lg:flex-row">
					<aside className="p-3 bg-white lg:basis-1/2">
						<h3 className="p-2 text-2xl">Cart</h3>
						<div className="flex flex-col overflow-y-scroll border-2 border-violet-300 h-60 custom-scrollbar">
							{cartProducts ? (
								cartProducts.map((product) => (
									<ProductCard3 key={product.id * 11} product={product} />
								))
							) : (
								<p>No Items in Cart</p>
							)}
						</div>
						<Button1 className="m-2 mx-auto rounded-full">Open Cart</Button1>
					</aside>

					<aside className="p-3 bg-white lg:basis-1/2">
						<h3 className="p-2 text-2xl">Wishlist</h3>
						<div className="flex flex-col overflow-y-scroll border-2 border-violet-300 h-60 custom-scrollbar">
							{wishlist &&
								Object.keys(wishlist).map((key) => (
									<ProductCard3 key={key} product={products[key]} />
								))}
						</div>
						<Button1 className="m-2 mx-auto rounded-full">
							Open Wishlist
						</Button1>
					</aside>
				</div>
			</section>

			<section className="flex flex-col gap-6 px-3 py-8 bg-sky-50 ">
				<h2 className="flex gap-3 text-4xl ">
					<span>Flashing Deals</span>
					<span>
						<TiFlash color={"skyblue"} />
					</span>
				</h2>
				<div className="grid grid-cols-4 gap-4">
					<ProductCard2 product={products[0]} />
					<ProductCard2 product={products[1]} />
					<ProductCard2 product={products[2]} />
					<ProductCard2 product={products[2]} />
				</div>
			</section>
			<section className="flex flex-col gap-6 px-6 py-8 bg-violet-50 ">
				<h2 className="flex gap-3 text-4xl ">
					<span>Explore Products</span>
					<span>
						<LuSearch color={"indigo"} />
					</span>
				</h2>
				<div className="flex flex-wrap gap-6 overflow-hidden">
					<ProductCard product={products[6]} />
					<ProductCard product={products[4]} />
					<ProductCard product={products[3]} />
					<ProductCard product={products[4]} />
				</div>
			</section>
		</div>
	);
};

export default Home;
