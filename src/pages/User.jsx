import React from "react";

import {TiUser} from "react-icons/ti";
import {Link} from "react-router-dom";
import useUser from "../hooks/useUser";
import {BarLoader} from "react-spinners";

const User = () => {
	let user = useUser("User");
	if (!user) return <BarLoader />;
	return (
		<div className="p-4 ">
			<div className="flex items-center gap-4 p-2">
				{user?.profile ? (
					<img src={user.profile}></img>
				) : (
					<TiUser className="text-6xl text-gray-500 rounded-full ring ring-gray-400" />
				)}

				<div className="flex flex-col justify-center leading-3">
					<h2 className="text-4xl font-bold capitalize font-geo">
						{user.name}
					</h2>
					<h4 className="pl-2 text-gray-400">{user.email}</h4>
				</div>
			</div>
			<div>
				<div className="p-4 text-2xl border">
					<Link to={"/order/history"}>Orders</Link>
				</div>
				<div className="p-4 text-2xl border">
					<Link to={"/user/addresses"}>Addresses</Link>
				</div>
				<div className="p-4 text-2xl border">
					<Link to={"/user/personal"}>Change Personal Information</Link>
				</div>
				<div className="p-4 text-2xl border">
					<Link to={"/user/settings"}>Settings</Link>
				</div>
				<div className="p-4 text-2xl border">
					<Link to={"/logout"}>Logout</Link>
				</div>
			</div>
		</div>
	);
};

export default User;
