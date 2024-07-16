import React, {useEffect, useState} from "react";
import Button1 from "../../../components/Button1";
import Rating from "../../../components/Rating";
import Heart from "../../../components/Heart";
import ProductImage from "../../../components/ProductImage";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllProductsAsync, selectAllProducts} from "../productListSlice";
import {useNavigate, useParams} from "react-router-dom";
import {HashLoader} from "react-spinners";

const ProductItemAdmin = () => {
	const {productId} = useParams();

	const products = useSelector(selectAllProducts);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, []);

	const product = products.find((product) => product.id === productId);

	console.log(products, product, productId);
	const navigate = useNavigate();
	if (!product) {
		console.log(product);
		return <HashLoader />;
	}
	return (
		<div className="flex flex-wrap overflow-hidden border divide-x-2 lg:flex-nowrap">
			<div className="w-full p-2 pt-4 border lg:w-1/2 border-violet-300">
				<ProductImage images={product.images} />
			</div>

			<div className="flex flex-col gap-4 p-5 font-geo">
				<h2 className="my-2 text-4xl font-light text-gray-600 dark:text-gray-100">
					{product.title}
				</h2>
				<p className="mt-1 text-2xl text-gray-700 ">{product.description}</p>

				<p className="text-2xl">
					<Rating rating={4} />
				</p>
				<p className="flex flex-col gap-2 ">
					<span className="text-2xl font-medium">Special Price </span>
					<div className="flex items-end gap-3 text-gray-600 dark:text-gray-100">
						<span className="text-4xl font-bold">
							${" "}
							{(
								product.price -
								(product.price * product.discountPercentage) / 100
							).toFixed(2)}
						</span>
						<span className="text-xl font-medium line-through">
							₹ {product.price}
						</span>
						<span className="text-xl text-green-500">
							{product.discountPercentage}% off.
						</span>
					</div>
				</p>

				<div className="flex p-4 my-4 border divide-x-4">
					<p className="flex gap-3 px-3 text-2xl ">
						<span>Brand</span>
						<span className="text-gray-600 dark:text-gray-100">
							{product.brand}
						</span>
					</p>
					<p className="flex gap-3 px-3 text-2xl">
						<span>Category</span>
						<span className="text-gray-600 dark:text-gray-100">
							{product.category}
						</span>
					</p>

					<p className="flex gap-3 px-3 text-2xl">
						<span>Stock</span>
						<span className="text-gray-600 dark:text-gray-100">
							{product.stock}
						</span>
					</p>
				</div>
				<div className="flex flex-row gap-6">
					<Button1
						className={`rounded-full hover:bg-emerald-400 bg-none shadow-none`}
						onClick={() => navigate(`/admin/product/edit/${product.id}`)}
					>
						<span className="flex items-center justify-center gap-1">
							Edit Product
						</span>
					</Button1>
				</div>
			</div>
		</div>
	);
};

export default ProductItemAdmin;
