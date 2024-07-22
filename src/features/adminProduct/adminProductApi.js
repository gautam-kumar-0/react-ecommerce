export function addProduct(product) {
	return new Promise(async (resolve) => {
		const response = await fetch(`http://localhost:4001/products`, {
			method: "POST",
			body: JSON.stringify(product),
			headers: {"content-type": "application/json"},
		});
		const data = await response.json();
		resolve({data});
	});
}

export function updateProduct(product) {
	return new Promise(async (resolve) => {
		const response = await fetch(
			`http://localhost:4001/products/${product.id}`,
			{
				method: "PATCH",
				body: JSON.stringify(product),
				headers: {"content-type": "application/json"},
			}
		);
		const data = await response.json();
		resolve({data});
	});
}

export function deleteProduct(productId) {
	return new Promise(async (resolve) => {
		const response = await fetch(
			`http://localhost:4001/products/${productId}`,
			{
				method: "PATCH",
				body: JSON.stringify({deleted: true}),
				headers: {"content-type": "application/json"},
			}
		);
		const data = await response.json();
		resolve({data});
	});
}
