import React from "react";
import {LuBuilding2, LuHome, LuX} from "react-icons/lu";
import {TbRoad} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {updateUserAsync} from "../userSlice";
import useUser from "../../../hooks/useUser";

const NewAddressForm = ({show, setShow}) => {
	const user = useUser("NewAddressForm");
	const toggleShow = () => setShow(!show);
	const dispatch = useDispatch();

	const addAddress = (e) => {
		e.preventDefault();
		const address = {
			name: e.target.name.value,
			type: e.target.type.value,
			street: e.target.street.value,
			landmark: e.target.landmark.value,
			city: e.target.city.value,
			district: e.target.district.value,
			state: e.target.state.value,
			pin: e.target.zip.value,
		};

		dispatch(
			updateUserAsync({update: {addresses: [...user.addresses, address]}, user})
		);
		setShow(false);
	};
	return (
		<div
			className="fixed top-0 left-0 w-full h-full bg-black/15"
			onClick={toggleShow}
		>
			<form
				className="fixed flex flex-col p-6 -translate-x-1/2 -translate-y-1/2 bg-white rounded top-1/2 left-1/2"
				onClick={(e) => e.stopPropagation()}
				onSubmit={addAddress}
			>
				<div className="flex flex-row justify-between ">
					<h2 className="text-xl font-semibold">New Address</h2>
					<button className="" onClick={toggleShow}>
						<LuX className="text-2xl hover:text-indigo-500" />
					</button>
				</div>

				<label for="email" className="block mt-4 mb-2 text-sm font-medium">
					Email
				</label>
				<div className="relative">
					<input
						type="text"
						id="email"
						name="email"
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none pl-11 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
						defaultValue={user.email}
						required
					/>
					<div className="absolute inset-y-0 left-0 inline-flex items-center px-3 pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-4 h-4 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
							/>
						</svg>
					</div>
				</div>
				<label for="name" className="block mt-4 mb-2 text-sm font-medium">
					Full Name
				</label>
				<div className="relative">
					<input
						type="text"
						id="name"
						name="Name"
						className="w-full px-4 py-3 text-sm uppercase border border-gray-200 rounded-md shadow-sm outline-none pl-11 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
						defaultValue={user.name}
						required
					/>
					<div className="absolute inset-y-0 left-0 inline-flex items-center px-3 pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-4 h-4 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
							/>
						</svg>
					</div>
				</div>
				<label for="street" className="block mt-4 mb-2 text-sm font-medium">
					Address
				</label>
				<div className="flex">
					<div className="relative flex-shrink-0 w-7/12">
						<input
							type="text"
							id="street"
							name="street"
							className="w-full px-2 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none pl-11 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
							placeholder="Street Address"
							required
						/>
						<div className="absolute inset-y-0 left-0 inline-flex items-center px-3 pointer-events-none">
							<TbRoad className="w-4 h-4 text-gray-400" />
						</div>
					</div>
					<input
						type="text"
						name="landmark"
						className="w-full px-2 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
						placeholder="Landmark"
					/>
					<input
						type="text"
						name="city"
						className="flex-shrink-0 w-1/6 px-2 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
						placeholder="City"
						required
					/>
				</div>
				<label for="district" className="block mt-4 mb-2 text-sm font-medium">
					District
				</label>
				<div className="flex flex-col sm:flex-row">
					<div className="relative flex-shrink-0 sm:w-7/12">
						<input
							type="text"
							id="district"
							name="district"
							className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
							placeholder="District"
							required
						/>
					</div>
					<select
						type="text"
						name="state"
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
					>
						<option value="State">State</option>
					</select>
					<input
						type="text"
						name="zip"
						className="flex-shrink-0 px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
						placeholder="ZIP"
						required
					/>
				</div>
				<label className="block mt-4 mb-2 text-sm font-medium">
					Address Category
				</label>

				<div className="flex gap-6 p-1">
					<label className="flex gap-2 text-sm font-medium ">
						<input
							hidden
							type="radio"
							name="type"
							value={"Home"}
							defaultChecked
							className="peer"
						/>
						<LuHome className="text-lg text-gray-400 peer-checked:text-indigo-500" />
						Home
					</label>
					<label className="flex gap-2 text-sm font-medium ">
						<input
							hidden
							type="radio"
							name="type"
							value={"Work"}
							className="peer"
						/>
						<LuBuilding2 className="text-lg text-gray-400 peer-checked:text-indigo-500" />
						Work
					</label>
				</div>
				<button
					className="w-full px-6 py-3 mt-4 mb-8 font-medium text-white bg-gray-900 rounded-md"
					type="submit"
				>
					Save Address
				</button>
			</form>
		</div>
	);
};

export default NewAddressForm;
