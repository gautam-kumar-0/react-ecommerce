import React from "react";

const OrderHistory = () => {
	const orderHistory = [1, 2, 3, 4];
	return (
		<div className="flex flex-col">
			<h2>Order:</h2>
			{orderHistory.map((order) => {
				return <div className="p-4 ">Order</div>;
			})}
		</div>
	);
};

export default OrderHistory;
