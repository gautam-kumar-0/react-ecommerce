export function fetchOrderByUser(userId) {
	return new Promise(async (resolve) => {
		const response = await fetch(
			`http://localhost:4000/orders?userId=${userId}`
		);
		const data = await response.json();
		resolve({data});
	});
}
export function fetchOrderById(orderId) {
	return new Promise(async (resolve) => {
		const response = await fetch(`http://localhost:4000/orders/${orderId}`);
		const data = await response.json();
		resolve(data);
	});
}
export function createOrder(order) {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:4000/orders", {
			method: "POST",
			body: JSON.stringify(order),
			headers: {"content-type": "application/json"},
		});
		const data = await response.json();
		resolve({data});
	});
}

export function cancelOrder(orderId) {
	return new Promise(async (resolve, reject) => {
		const order = fetchOrderById(orderId);
		if (order) {
			const response = await fetch(`http://localhost:4000/orders/${orderId}`, {
				method: "PATCH",
				body: JSON.stringify({...order, status: "cancelled"}),
				headers: {"content-type": "application/json"},
			});
			const data = await response.json();
			resolve({data});
		}
		reject({message: "Order Not found!"});
	});
}
