import React, {useEffect} from "react";
import useOrder from "../hooks/useOrder";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchOrderByUserAsync} from "../features/order/orderSlice";
import useUser from "../hooks/useUser";

const OrderHistory = () => {
	const {orders} = useOrder();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useUser();
	useEffect(() => {
		dispatch(fetchOrderByUserAsync(user.id));
	}, [dispatch, user.id]);
	return (
		<div className="flex flex-col">
			<h2>Order:</h2>
			{orders.map((order) => {
				return (
					<div
						className="p-2 border"
						onClick={() => navigate(`/order/${order.id}`)}
					>
						{dayjs(order.createdAt).format("HH:mm DD/MM/YY")}
						{order.id} {order.status}
					</div>
				);
			})}
		</div>
	);
};

export default OrderHistory;
