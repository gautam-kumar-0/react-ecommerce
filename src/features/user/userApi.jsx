export function fetchUserDetails(userId) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(`http://localhost:4001/users/${userId}`);
		const data = await response.json();
		resolve({data});
	});
}

export function updateUser({update, user}) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(
			`http://localhost:4001/users?email=${user.email}`
		);
		const data = await response.json();

		if (data.length) {
			const newUser = data[0];
			for (let key in update) {
				newUser[key] = update[key];
			}
			const res = await fetch(`http://localhost:4001/users/${data[0].id}`, {
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
