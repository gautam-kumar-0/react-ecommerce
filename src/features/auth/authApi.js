export function createUser(user) {
	return new Promise(async (resolve) => {
		const response = await fetch("http://localhost:4000/users", {
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
		const response = await fetch(
			`http://localhost:4000/users?email=${user.email}`
		);
		const data = await response.json();
		if (data.length) {
			if (data[0].password === user.password) {
				resolve({data: data[0].id});
			} else {
				reject({message: "password doesn't match."});
			}
		} else {
			reject({message: "Email and password doesn't match."});
		}
	});
}
