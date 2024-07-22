export function fetchCart(user) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch("http://localhost:4001/cart?user=" + user);
		const data = await response.json();
		resolve({data});
	});
}
export function addToCart(item) {
	return new Promise(async (resolve, reject) => {
		const find = await fetch(
			`http://localhost:4001/cart?user=${item.user}&&product=${item.product}`
		);
		const found = await find.json();

		let response;
		if (found.length) {
			response = await fetch(`http://localhost:4001/cart/${found[0].id}`, {
				method: "PATCH",
				body: JSON.stringify({...found[0], quantity: found[0].quantity + 1}),
				headers: {"content-type": "application/json"},
			});
		} else {
			response = await fetch("http://localhost:4001/cart", {
				method: "POST",
				body: JSON.stringify(item),
				headers: {"content-type": "application/json"},
			});
		}

		const data = response.json();
		resolve({data});
	});
}

export function decrementCart(item) {
	return new Promise(async (resolve, reject) => {
		const find = await fetch(
			`http://localhost:4001/cart?user=${item.user}&&product=${item.product}`
		);
		const found = await find.json();
		if (found.length) {
			if (found[0].quantity > 1) {
				const response = await fetch(
					`http://localhost:4001/cart/${found[0].id}`,
					{
						method: "PATCH",
						body: JSON.stringify({
							...found[0],
							quantity: found[0].quantity - 1,
						}),
						headers: {"content-type": "application/json"},
					}
				);
				const data = response.json();

				resolve({data});
			}
		} else {
			reject({message: "Item Not found"});
		}
	});
}

export function removeFromCart(item) {
	return new Promise(async (resolve, reject) => {
		const find = await fetch(
			`http://localhost:4001/cart?user=${item.user}&&product=${item.product}`
		);
		const found = await find.json();
		if (found.length) {
			const response = await fetch(
				`http://localhost:4001/cart/${found[0].id}`,
				{
					method: "DELETE",
					headers: {"content-type": "application/json"},
				}
			);
			const data = await response.json();
			resolve({data});
		} else {
			reject({message: "Item Not Found"});
		}
	});
}

export function resetCart(userId) {
	return new Promise(async (resolve) => {
		const response = await Promise.resolve(fetchCart(userId));
		for (let item of response.data) {
			const del = await fetch(`http://localhost:4001/cart/${item.id}`, {
				method: "DELETE",
				headers: {"content-type": "application/json"},
			});
		}
		resolve({message: "All items deleted"});
	});
}
