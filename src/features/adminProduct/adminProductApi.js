export function addProduct(product) {
	return new Promise(async (resolve) => {
		const response = await fetch(`http://localhost:4000/products`, {
			method: "POST",
			body: JSON.stringify(product),
			headers: {"content-type": "application/json"},
		});
		const data = await response.json();
		resolve({data});
	});
}
