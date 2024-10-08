const OrderInfoOld = ({products, cart}) => {
	const total = products.reduce(
		(acc, product) => acc + product.price * cart[product.id].quantity,
		0
	);
	const items = products.length;
	return (
		<div>
			<p className="mb-4 text-xl font-medium ">Products</p>
			<div className="flex-col gap-3">
				{products.map((p, i) => {
					return (
						<div className="flex items-center justify-between gap-2" key={i}>
							<p className="text-sm text-gray-800 ">{p.title}</p>

							<p className="">
								<span> ${p.price * cart[p.id].quantity}</span>
							</p>
						</div>
					);
				})}
			</div>
			<div className="py-2 border-t border-b">
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium text-gray-900">Subtotal</p>
					<p className="font-semibold text-gray-900">${total}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium text-gray-900">Shipping</p>
					<p className="font-semibold text-gray-900">${50 * items}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium text-gray-900">Tax</p>
					<p className="font-semibold text-gray-900">
						${(total * 0.18).toFixed(2)}
					</p>
				</div>
				<div className="flex items-center justify-between pt-20 pb-6 lg:pt-5">
					<p className="font-medium leading-normal text-gray-800">Total</p>
					<p className="text-2xl font-bold leading-normal text-right text-gray-800">
						${(total + total * 0.18 + 50).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderInfoOld;
