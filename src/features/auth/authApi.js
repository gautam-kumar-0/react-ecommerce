export function createUser(user) {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:4000/users/register", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {"content-type": "application/json"},
		});
		const data = await response.json();
		resolve({data});
	});
}

export function checkUser(user) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(`http://localhost:4000/login`);
		const data = await response.json();
		resolve({data});
	});
}
