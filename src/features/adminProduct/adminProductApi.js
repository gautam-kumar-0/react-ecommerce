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

export function updateProduct(product) {
	return new Promise(async (resolve) => {
		const response = await fetch(
			`http://localhost:4000/products/${product.id}`,
			{
				method: "PUT",
				body: JSON.stringify(product),
				headers: {"content-type": "application/json"},
			}
		);
		const data = await response.json();
		console.log("Payload Check Update: ", data);
		resolve({data: data.updatedProduct});
	});
}

export function deleteProduct(productId) {
	return new Promise(async (resolve) => {
		const response = await fetch(
			`http://localhost:4000/products/${productId}`,
			{
				method: "DELETE",
				body: JSON.stringify({deleted: true}),
				headers: {"content-type": "application/json"},
			}
		);
		const data = await response.json();
		resolve({data});
	});
}
