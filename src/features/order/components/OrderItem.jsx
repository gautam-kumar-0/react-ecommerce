import React from "react";
import {useSelector} from "react-redux";
import {getProductById} from "../../ProductsList/productListSlice";

const OrderItem = ({productId}) => {
	const product = useSelector((state) => getProductById(state, productId));
	return (
		<img
			className="object-cover w-32 h-32 rounded"
			src={product.thumbnail}
			alt={product.title}
		/>
	);
};

export default OrderItem;
