import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderByIdAsync} from "../features/order/orderSlice";
import OrderList from "../features/order/components/OrderList";
import {BarLoader} from "react-spinners";
import dayjs from "dayjs";

const OrderStatus = () => {
	const dispatch = useDispatch();

	const {orderId} = useParams();
	const order = useSelector((state) => state.order.orderById);
	useEffect(() => {
		dispatch(fetchOrderByIdAsync(orderId));
	}, []);
	if (!order?.id) return <BarLoader />;
	return (
		<div className="p-5">
			<h2>Order No. {orderId}</h2>
			<p>{order.status}</p>
			<p>{dayjs(order.createdAt).format("HH:mm DD/MM/YY")}</p>
			<OrderList ids={Object.keys(order.cart)} />
		</div>
	);
};

export default OrderStatus;
