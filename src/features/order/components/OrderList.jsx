import OrderItem from "./OrderItem";

const OrderList = ({ids}) => {
	return (
		<div className="relative w-32 h-32 shadow-md ">
			{ids.map((id, i) => {
				return (
					<div
						className={`shadow-md rounded absolute w-32 h-32  top-0  `}
						style={{
							left: `${i * (80 - 10 * i)}px`,
							zIndex: ids.length - i,
							scale: `${100 - 10 * i}%`,

							overflow: "hidden",
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
