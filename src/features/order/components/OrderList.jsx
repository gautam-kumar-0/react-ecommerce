import OrderItem from "./OrderItem";

const OrderList = ({ids}) => {
	return (
		<div className="relative w-24 h-24 overflow-hidden ring">
			{ids.map((id, i) => {
				return (
					<div
						className={`absolute w-12 h-12 ring top-0 left-[${20 * i}px] `}
						key={i}
					>
						<OrderItem productId={id} />
						{id}
					</div>
				);
			})}
		</div>
	);
};

export default OrderList;
