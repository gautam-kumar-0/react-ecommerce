import React, {useEffect} from "react";
import useOrder from "../hooks/useOrder";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchOrderByUserAsync} from "../features/order/orderSlice";
import useUser from "../hooks/useUser";
import Button1 from "../components/Button1";
import OrderList from "../features/order/components/OrderList";

const OrderHistory = () => {
	const {orders} = useOrder();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useUser();
	useEffect(() => {
		dispatch(fetchOrderByUserAsync(user.id));
	}, [dispatch, user.id]);
	return (
		<div className="flex flex-col gap-1 p-4 divide-y-1">
			<h2 className="p-3 text-3xl font-bold ">Orders</h2>
			{orders.map((order) => {
				return (
					<div className="p-2 " onClick={() => navigate(`/order/${order.id}`)}>
						<div className="flex border">
							<div className="flex flex-col gap-4 p-5 ">
								<div className="flex items-center gap-2">
									<span className="text-lg font-medium">Order number </span>
									<h2 className="p-2 text-2xl font-bold">#{order.id}</h2>
								</div>
								<div className="flex gap-2">
									<p className="text-xl">Current Status </p>
									<p className="text-xl font-bold text-blue-600 capitalize">
										{order.status}
									</p>
								</div>
								<Button1 className="rounded-full">Order Details</Button1>
								<p>{dayjs(order.createdAt).format("HH:mm DD/MM/YY")}</p>
							</div>

							<div className="p-5">
								<OrderList ids={Object.keys(order.cart)} />
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default OrderHistory;
