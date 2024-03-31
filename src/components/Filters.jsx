// import {useEffect, useState} from "react";
import {LuChevronDown, LuSearch, LuX} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import {
	selectCategory,
	getBrands,
} from "../features/ProductsList/productListSlice";

const RadioOption = ({value, name, onChange, checked}) => {
	return (
		<label
			htmlFor={value}
			className="flex flex-row items-center gap-3 my-1 text-gray-900 dark:text-gray-300"
		>
			<input
				id={value}
				value={value}
				type="radio"
				name={name}
				onChange={onChange}
				checked={value === checked}
				className="hidden peer"
			/>
			<span className="w-3 h-3 border-1 border-slate-700 bg-slate-400 peer-checked:border-transparent  rounded-full *:invisible peer-checked:bg-green-500 ring ring-slate-500 peer-checked:ring-green-400"></span>
			<span className="capitalize text-slate-900">{value}</span>
		</label>
	);
};
const Accordion = ({visible, id, children}) => {
	return (
		<div className="p-2 px-4 bg-white/20 rounded-2xl w-72">
			<label
				htmlFor={id}
				className="flex items-center justify-between text-white/70 "
			>
				<h1 className="text-lg capitalize">{id}</h1>
				<LuChevronDown
					style={{display: visible ? "block" : "none"}}
					className="p-1 text-2xl transition-all rounded-full hover:bg-slate-600/50"
				/>
			</label>
			<input type="checkbox" name="" id={id} className="hidden peer" />
			{children}
		</div>
	);
};
const Filters = ({
	filter,
	sort,
	handleFilter,
	handleSort,
	resetFilter,
	resetSort,
	show,
	setShow,
}) => {
	const sortBy = ["price", "rating"];
	const sortOrder = ["asc", "desc"];

	const category = Object.keys(useSelector(selectCategory));
	const brand = useSelector((state) => getBrands(state, filter.category));

	return (
		<div
			className={`fixed z-50 top-0 h-[100vh] left-0 flex-shrink-0 overflow-x-hidden overflow-y-scroll  scroll scroll-3 bg-slate-500 font-geo transition-[translate] `}
			style={{translate: show ? "0px" : "-100%"}}
		>
			<div className="flex flex-col gap-6 p-2 px-4">
				<div
					onClick={() => setShow(false)}
					className="flex items-center self-end justify-between text-white/70 "
				>
					<LuX className="p-1 text-4xl transition-all rounded-full hover:bg-slate-600/50" />
				</div>
				{/* <div className="flex ">
					<label htmlFor="" className="relative ">
						<input
							type="text"
							id="name"
							name="q"
							value={filter.q}
							onChange={handleFilter}
							className="block px-4 py-2 text-lg pr-14 rounded-xl ring-2 focus:ring-slate-600 dark:ring-gray-600 focus:outline-none bg-white/30 ring-slate-500 min-w-48 sm:min-w-64 lg:min-w-72 placeholder:text-white/60"
							autoComplete="off"
							placeholder="Search"
							required
						/>
						<span className="absolute top-0 right-0 flex items-center h-full pl-3 pr-4 rounded-r-xl bg-white/40">
							<LuSearch className="hover:scale-110 text-slate-500" />
						</span>
					</label>
				</div> */}
				<div className="flex flex-col gap-3">
					<h2 className="flex items-center gap-5 text-xl font-md text-slate-800">
						Filters
						<LuX
							className=" text-white/50"
							style={{visibility: filter.category ? "visible" : "hidden"}}
							onClick={resetFilter}
						/>
					</h2>
					<Accordion id="category" visible={category.length}>
						<div class="p-2 flex flex-col items-start peer-checked:hidden">
							{category.map((c) => {
								return (
									<RadioOption
										value={c}
										name={"category"}
										checked={filter.category}
										onChange={handleFilter}
									/>
								);
							})}
						</div>
					</Accordion>
					<Accordion id="brands" visible={filter.category}>
						<div class=" flex flex-col items-start peer-checked:hidden">
							{brand.map((b) => {
								return (
									<RadioOption
										value={b}
										name={"brand"}
										checked={filter.brand}
										onChange={handleFilter}
									/>
								);
							})}
						</div>
					</Accordion>
				</div>
				<div className="flex flex-col gap-3">
					<h2 className="flex items-center gap-5 text-xl font-md text-slate-800">
						Sorting
						<LuX
							className=" text-white/50"
							style={{
								visibility: sort.by || sort.order ? "visible" : "hidden",
							}}
							onClick={resetSort}
						/>
					</h2>
					<div className="p-2 px-4 bg-white/20 rounded-2xl ">
						<div class=" flex justify-between gap-4 items-start peer-checked:hidden">
							{sortOrder.map((o) => {
								return (
									<RadioOption
										value={o}
										name={"order"}
										checked={sort.order}
										onChange={handleSort}
									/>
								);
							})}
						</div>
						<div class=" flex flex-col items-start peer-checked:hidden">
							{sortBy.map((b) => {
								return (
									<RadioOption
										value={b}
										name={"by"}
										checked={sort.by}
										onChange={handleSort}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filters;
