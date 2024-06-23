import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderByIdAsync} from "../features/order/orderSlice";
import OrderList from "../features/order/components/OrderList";
import {BarLoader} from "react-spinners";

import {LuBuilding2, LuHome} from "react-icons/lu";
import {getProductByIds} from "../features/ProductsList/productListSlice";
import OrderInfo from "../features/order/components/OrderInfo";

const OrderStatus = () => {
	const dispatch = useDispatch();

	const {orderId} = useParams();
	const order = useSelector((state) => state.order.orderById);
	const a = order.shippingAddress;
	let productsIds = Object.keys(order.cart) || [1];
	useEffect(() => {
		dispatch(fetchOrderByIdAsync(orderId));
	}, []);
	const products = useSelector((state) => getProductByIds(state, productsIds));
	if (!products || !order?.id) return <BarLoader />;

	return (
		<div>
			<form
				id="checkout"
				className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32"
			>
				<div className="px-4 pt-8">
					<p className="text-xl font-medium">Order Summary</p>
					<p className="text-gray-400">View your order details.</p>
					<div className="px-2 py-4 mt-8 space-y-3 overflow-y-scroll bg-white border rounded-lg sm:px-6 max-h-60 scroll">
						{products.map((p, i) => {
							return (
								<div
									className="flex flex-col bg-white rounded-lg sm:flex-row"
									key={i}
								>
									<img
										className="object-cover object-center h-24 m-2 border rounded-md w-28"
										src={p.thumbnail}
										alt={p.title}
									/>
									<div className="flex flex-col w-full px-4 py-4">
										<span className="font-semibold">{p.title}</span>
										<span className="float-right text-gray-400">{p.brand}</span>
										<p className="text-lg font-bold">
											${p.price * order.cart[p.id]}
										</p>
									</div>
								</div>
							);
						})}
					</div>

					<div className="flex justify-between mt-8">
						<span className="text-lg font-medium">Delivering to</span>
					</div>
					<div className="grid gap-6 mt-5">
						<div className="relative">
							<div
								className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 peer-focused:ring"
								htmlFor={`address`}
							>
								<span className="text-lg font-medium">
									{a.type === "Work" ? <LuBuilding2 /> : <LuHome />}
								</span>
								<div className="ml-5 font-light text-gray-500 font-geo ">
									<span className="mt-2 font-semibold text-gray-900">
										{a.name}
									</span>
									<span className="m-1">{a.landmark},</span>
									<span className="m-1">{a.street},</span>
									<span className="m-1">{a.city},</span>
									<span className="m-1">{a.district},</span>
									<span className="m-1">{a.state},</span>
									<span className="m-1">{a.pin}.</span>
									<p className="text-sm leading-6 text-slate-500">
										{a.estimates}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="px-4 mt-10 bg-gray-50 lg:mt-0">
					<div className="">
						{/*Total*/}
						<OrderInfo products={products} cart={order.cart} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default OrderStatus;
