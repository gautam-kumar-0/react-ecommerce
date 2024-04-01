import React, {useEffect} from "react";
import useOrder from "../hooks/useOrder";
import {BarLoader} from "react-spinners";
import {LuCheckCheck, LuCross} from "react-icons/lu";
import {useDispatch} from "react-redux";
import {resetCartAsync} from "../features/cart/cartListSlice";
import {resetOrder} from "../features/order/orderSlice";
import {useNavigate} from "react-router-dom";
import useUser from "../hooks/useUser";

const OrderProcess = () => {
	const {orders, currentOrder, status, error} = useOrder();
	const user = useUser();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (status === "success") {
			setTimeout(() => {
				dispatch(resetCartAsync(user.id));
				dispatch(resetOrder());
				navigate(`/order/${currentOrder.id}`, {replace: true});
			}, 3000);
		}
	});
	const pending = (
		<div>
			<BarLoader className="text-4xl text-indigo-500" />
			<h3>You will be automatically redirect</h3>
		</div>
	);
	const success = (
		<div>
			<div className="flex gap-3">
				<LuCheckCheck className="text-4xl text-emerald-500" />
				<h3 className="text-lg font-medium">Order completed successfully!</h3>
			</div>
			<p>Order Id {currentOrder?.id}</p>
		</div>
	);
	const failed = (
		<div className="flex">
			<LuCross className="text-4xl text-emerald-500" />
			<h3 className="text-lg font-medium">Order failed!</h3>
			<span>{error?.message}</span>
		</div>
	);
	let content = null;
	if (status === "pending") content = pending;
	else if (status === "success") content = success;
	else if (status === " failed") content = failed;
	console.log("Order Process Status and content", content, status);
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h1 className="text-2xl font-medium text-gray-700">
				Processing You Order!
			</h1>
			{content}
		</div>
	);
};

export default OrderProcess;
