import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useCart from "../hooks/useCart";
import {LuBuilding2, LuHome} from "react-icons/lu";
import OrderInfo from "../features/order/components/OrderInfo";
import NewAddressForm from "../features/user/components/NewAddressForm";
import {useDispatch, useSelector} from "react-redux";
import {createOrderAsync, selectOrderState} from "../features/order/orderSlice";
import useUser from "../hooks/useUser";

const Checkout = () => {
	const {products, cart} = useCart();
	const [showAddForm, setShowAddForm] = useState(false);
	const [shippingAddress, setShippingAddress] = useState(0);
	const [showError, setShowError] = useState(false);
	let user = useUser();
	const dispatch = useDispatch();
	const order = useSelector(selectOrderState);
	const createOrder = (e) => {
		e.preventDefault();
		const order = {
			userId: user.id,
			shippingAddress: user.addresses[shippingAddress],
			status: "pending",
			createdAt: Date.now(),
			items: {},
			payment: {
				total: 0,
				items: products.length,
				tax: 2,
				shippingCost: 0,
				checkOutDiscountPercentage: 0,
				amountPayable: 0,
			},
		};

		for (let p of products) {
			const total = ((p.price * p.discountPercentage) / 100).toFixed(3);
			order.items[p.id] = {
				quantity: cart[p.id],
				price: p.price,
				discountPercentage: p.discountPercentage,
				total: ((p.price * p.discountPercentage) / 100).toFixed(3),
			};
			order.payment.total += Number(total);
		}
		order.payment.shippingCost = Math.round(order.payment.total / 100);
		console.log(order);
		order.payment.amountPayable = (
			order.payment.shippingCost +
			order.payment.total +
			(order.payment.tax * order.payment.total) / 100
		).toFixed(3);
		dispatch(createOrderAsync(order));
	};
	const navigate = useNavigate();
	useEffect(() => {
		if (order.currentOrder) {
			navigate("/order/processing", {replace: true});
		} else if (order.error) {
			setShowError(true);
		}
	}, [order]);

	return (
		<div>
			<div className="flex flex-col items-center py-4 bg-white border-b sm:flex-row sm:px-10 lg:px-20 xl:px-32">
				<Link to="#" className="text-2xl font-bold text-gray-800">
					Checkout
				</Link>
				<div className="py-2 mt-4 text-xs sm:mt-0 sm:ml-auto sm:text-base">
					<div className="relative">
						<ul className="relative flex items-center justify-between w-full space-x-2 sm:space-x-4">
							<li className="flex items-center space-x-3 text-left sm:space-x-4">
								<Link
									className="flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-emerald-200 text-emerald-700"
									to="#"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</Link>
								<span className="font-semibold text-gray-900">Shop</span>
							</li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-4 h-4 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
							<li className="flex items-center space-x-3 text-left sm:space-x-4">
								<Link
									className="flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gray-600 rounded-full ring ring-gray-600 ring-offset-2"
									to="#"
								>
									2
								</Link>
								<span className="font-semibold text-gray-900">Shipping</span>
							</li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-4 h-4 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
							<li className="flex items-center space-x-3 text-left sm:space-x-4">
								<Link
									className="flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-gray-400 rounded-full"
									to="#"
								>
									3
								</Link>
								<span className="font-semibold text-gray-500">Payment</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<form
				id="checkout"
				className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32"
			>
				<div className="px-4 pt-8">
					<p className="text-xl font-medium">Order Summary</p>
					<p className="text-gray-400">
						Check your items. And select a suitable shipping method.
					</p>
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
										<p className="text-lg font-bold">${p.price * cart[p.id]}</p>
									</div>
								</div>
							);
						})}
					</div>

					<div className="flex justify-between mt-8">
						<span className="text-lg font-medium">Deliver to</span>
						<span
							className="text-indigo-600"
							onClick={() => setShowAddForm(!showAddForm)}
						>
							New Address
						</span>
					</div>
					<div className="grid gap-6 mt-5">
						{user?.addresses &&
							user.addresses.map((a, i) => {
								return (
									<div className="relative">
										<input
											className="hidden peer"
											id={`address_${i}`}
											type="radio"
											name="address"
											checked={shippingAddress === i}
											required
											onChange={() => setShippingAddress(i)}
										/>
										<span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
										<label
											className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 peer-focused:ring"
											htmlFor={`address_${i}`}
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
										</label>
									</div>
								);
							})}
					</div>
				</div>
				<div className="px-4 mt-10 bg-gray-50 lg:mt-0">
					<div className="">
						{/*Total*/}
						<OrderInfo products={products} cart={cart} />

						<button
							className="w-full px-6 py-3 mb-4 font-medium text-white bg-gray-900 rounded-md "
							type="button"
							onClick={createOrder}
						>
							<span>Order Now</span>
						</button>
					</div>
				</div>
			</form>
			{showAddForm && (
				<NewAddressForm show={showAddForm} setShow={setShowAddForm} />
			)}
		</div>
	);
};

export default Checkout;
