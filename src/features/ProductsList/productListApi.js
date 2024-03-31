export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:4000/products");
		const data = await response.json();
		resolve({data});
	});
}
export function fetchProductByFilter(filter, sort, page) {
	return new Promise(async (resolve) => {
		let queryString = `?_page=${page}&_per_page=8&`;
		for (let type in filter) {
			if (filter[type]) {
				queryString += `${[type]}=${filter[type]}&`;
			}
		}
		if (sort.by) {
			const order = sort.order === "asc" ? "" : "-";
			queryString += `_sort=${order}${sort.by}`;
		}

		const response = await fetch(
			`http://localhost:4000/products${queryString}`
		);

		const data = await response.json();

		resolve(data);
	});
}
