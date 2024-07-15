import React from "react";
import {useSelector} from "react-redux";
import {getProductById} from "../../ProductsList/productListSlice";

const OrderItem = ({productId, size}) => {
	const product = useSelector((state) => getProductById(state, productId));

	if (!product) return productId;
	return (
		<img
			className={`object-cover rounded ${size}`}
			src={product?.thumbnail}
			alt={product?.title}
		/>
	);
};

export default OrderItem;
