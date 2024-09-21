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
		console.log("CheckUser,", user);
		const response = await fetch(`http://localhost:4000/users/login`, {
			method: "POST",
			body: JSON.stringify(user),

			headers: {"content-type": "application/json"},
		});
		const data = await response.json();
		resolve({data});
	});
}
