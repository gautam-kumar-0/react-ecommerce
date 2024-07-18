export function fetchOrderByFilter(params) {
	return new Promise(async (resolve) => {
		console.log("Params", params, params.sort);
		let queryString = `?_page=1&_per_page=10&`;

		if (params?.sort) {
			const order = params.sort.reverse ? "-" : "";
			queryString += `_sort=${order}${params.sort.sortKey}`;
		}
		console.log("QueryString", queryString);
		const response = await fetch(`http://localhost:4000/orders${queryString}`);

		const data = await response.json();
		console.log(data, response);
		resolve({data});
	});
}
export function updateOrderById(params) {
	return new Promise(async (resolve) => {
		const response = await fetch(`http://localhost:4000/orders${params.id}`, {
			method: "PATCH",
			body: JSON.stringify({...params}),
			"content-type": "application/json",
		});

		const data = await response.json();
		console.log(data, response);
		resolve({data});
	});
}
