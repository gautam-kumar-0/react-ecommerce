import React, {useEffect} from "react";
import useOrder from "../hooks/useOrder";
import {BarLoader} from "react-spinners";
import {LuCheckCheck, LuCross} from "react-icons/lu";
import {useDispatch} from "react-redux";
import {resetCart} from "../features/cart/cartListApi";
import {resetCartAsync} from "../features/cart/cartListSlice";
import useAuth from "../hooks/useAuth";
import {resetOrder} from "../features/order/orderSlice";
import {useNavigate} from "react-router-dom";

const OrderProcess = () => {
	const {orders, currentOrder, status, error} = useOrder();
	const user = useAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (status === "success") {
			dispatch(resetCartAsync(user.id));
			setTimeout(() => {
				navigate(`/order/${currentOrder.id}`, {replace: true});
			}, 7000);
		}
		return () => {
			dispatch(resetOrder());
		};
	});

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h1 className="text-2xl font-medium text-gray-700">
				Processing You Order!
			</h1>
			{status === "pending" && (
				<div>
					<BarLoader className="text-4xl text-indigo-500" />
					<h3>You will be automatically redirect</h3>
				</div>
			)}
			{status === "success" && (
				<div className="flex">
					<LuCheckCheck className="text-4xl text-emerald-500" />
					<h3 className="text-lg font-medium">Order completed successfully!</h3>
					<p>Order Id {currentOrder.id}</p>
				</div>
			)}
			{status === "failed" && (
				<div className="flex">
					<LuCross className="text-4xl text-emerald-500" />
					<h3 className="text-lg font-medium">Order failed!</h3>
					<span>{error.message}</span>
				</div>
			)}
		</div>
	);
};

export default OrderProcess;
