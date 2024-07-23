import {useState} from "react";
import {LuBuilding2, LuHome, LuPen, LuTrash} from "react-icons/lu";
import useUser from "../../../hooks/useUser";
import NewAddressForm from "./NewAddressForm";
import {EditAddressForm} from "./EditAddressForm";
const AddressPage = () => {
	const user = useUser("AddressPage");
	const [defaultAddress, setDefaultAddress] = useState({});
	const [showNewForm, setShowNewForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);

	const [index, setIndex] = useState(null);
	function handleEditAddr(index) {
		setShowNewForm(false);
		setShowEditForm(true);
		setIndex(index);
	}
	return (
		<div className="p-2 fon-sans">
			<h3 className="text-xl font-semibold">
				<span className="text-indigo-400 capitalize">{user.name}</span> /
				addresses
			</h3>
			<div className="flex flex-col p-4 my-4 border rounded">
				<div className="flex justify-between gap-6">
					<h3 className="text-xl font-medium">Available Addresses</h3>
					<p
						className="text-xl text-indigo-600"
						onClick={() => setShowNewForm(!showNewForm)}
					>
						New Address
					</p>
				</div>
				<div className="grid gap-2 p-2 mt-5">
					{user?.addresses &&
						user.addresses.map((a, i) => {
							return (
								<div className="relative">
									<input
										className="hidden peer"
										id={`address_${i}`}
										type="radio"
										name="address"
										checked={defaultAddress === i}
										required
										onChange={() => setDefaultAddress(i, a)}
									/>
									<span className="invisible m-2 text-sm font-bold text-indigo-500 peer-checked:visible">
										Default
									</span>
									<label
										className="flex justify-start p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-gray-700 peer-checked:bg-gray-50 peer-focused:ring"
										htmlFor={`address_${i}`}
									>
										<span className="text-lg font-medium">
											{a.type === "Work" ? <LuBuilding2 /> : <LuHome />}
										</span>
										<div className="flex-grow ml-5 font-light text-gray-500 font-geo ">
											<span className="mt-2 font-semibold text-gray-900">
												{a.name}
											</span>
											<span className="m-1">{a.landmark},</span>
											<span className="m-1">{a.street},</span>
											<span className="m-1">{a.city},</span>
											<span className="m-1">{a.district},</span>
											<span className="m-1">{a.state},</span>
											<span className="m-1">{a.pin}.</span>
											<p className="text-sm leading-6 text-slate-500">
												{a.estimates}
											</p>
										</div>
										<div className="flex gap-6 px-2 justify-self-end">
											<LuPen
												className="text-lg hover:text-indigo-500"
												onClick={() => handleEditAddr(i)}
											/>
											<LuTrash className="text-lg hover:text-indigo-500" />
										</div>
									</label>
								</div>
							);
						})}
					{!user?.addresses.length && (
						<span className="font-medium text-indigo-400 font">
							No address available!
						</span>
					)}
				</div>
			</div>
			{showNewForm && (
				<NewAddressForm show={showNewForm} setShow={setShowNewForm} />
			)}
			{showEditForm && (
				<EditAddressForm
					show={showEditForm}
					setShow={setShowEditForm}
					index={index}
					address={user.addresses[index]}
				/>
			)}
		</div>
	);
};

export default AddressPage;
