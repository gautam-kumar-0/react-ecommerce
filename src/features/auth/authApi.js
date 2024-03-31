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
				resolve({data: data[0]});
			} else {
				reject({message: "password doesn't match."});
			}
		} else {
			reject({message: "Email and password doesn't match."});
		}
	});
}
export function updateUser({update, user}) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(
			`http://localhost:4000/users?email=${user.email}`
		);
		const data = await response.json();

		if (data.length) {
			const newUser = data[0];
			for (let key in update) {
				newUser[key] = update[key];
			}
			const res = await fetch(`http://localhost:4000/users/${data[0].id}`, {
				method: "PATCH",
				body: JSON.stringify(newUser),
				header: {"content-type": "application/json"},
			});
			const d = await res.json();
			resolve({data: d});
		} else {
			reject({message: "User Not found"});
		}
	});
}
