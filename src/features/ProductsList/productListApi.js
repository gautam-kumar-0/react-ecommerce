export function fetchAllProducts() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:4001/products");
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
			query["sort"] = sort.by;
			query["sortOrder"] = sort.order;
		}
		query["page"] = page;
		query["limit"] = 8;
		const searchParams = new URLSearchParams(query);
		url.search = searchParams;
		// console.log(url.href);
		// console.log(query);
		// console.log(searchParams.entries(), url);

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

		const response = await fetch(url.href, {});

		const data = await response.json();
		console.log(data);
		resolve(data);
	});
}
