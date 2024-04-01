import OrderItem from "./OrderItem";

const OrderList = ({ids}) => {
	return (
		<div className="relative w-32 h-32 overflow-hidden">
			{ids.map((id, i) => {
				return (
					<div
						className={`shadow-md rounded absolute w-14 h-14  top-0  `}
						style={{
							left: `${i * 30 - i * 5}px`,
							zIndex: ids.length - i,
							scale: `${100 - 8 * i}%`,
						}}
						key={i}
					>
						<OrderItem productId={id} />
					</div>
				);
			})}
		</div>
	);
};

export default OrderList;
