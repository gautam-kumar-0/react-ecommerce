export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:4000/products");
		const data = await response.json();
		resolve({data});
	});
}
export function fetchProductByFilter(filter, sort, page) {
	return new Promise(async (resolve) => {
		const url = new URL("http://localhost:4000/products");
		let query = {};
		for (let type in filter) {
			if (filter[type]) {
				query[type] = filter[type];
			}
		}
		if (sort.by) {
			const order = sort.order === "asc" ? "" : "-";
			query.sort += `${order}${sort.by}`;
		}
		query["page"] = page;
		query["limit"] = 8;
		const searchParams = new URLSearchParams(query);
		url.search = searchParams;

		const response = await fetch(url.href, {});

		const data = await response.json();
		console.log(url.href);
		console.log(data);
		resolve(data);
	});
}
