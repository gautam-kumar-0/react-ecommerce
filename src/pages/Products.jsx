import React, {useEffect, useState} from "react";
import Filters from "../components/Filters";
import ProductList from "../features/ProductsList/components/ProductList";
import {useDispatch, useSelector} from "react-redux";
import {
	fetchProductsByFilterAsync,
	selectPagination,
} from "../features/ProductsList/productListSlice";
import {
	LuChevronLeft,
	LuChevronRight,
	LuFilter,
	LuMenu,
	LuMenuSquare,
	LuOption,
} from "react-icons/lu";

const PageBtn = ({page, setPage, children}) => {
	return (
		<button
			disabled={page ? false : true}
			onClick={() => setPage(page)}
			className="px-2 py-1 font-semibold border border-indigo-500 hover:bg-indigo-500 hover:text-white disabled:bg-slate-200 disabled:text-gray-400 disabled:border-0"
		>
			{children}
		</button>
	);
};
const PageNum = ({page, setPage, children, className}) => {
	return (
		<button
			hidden={page ? false : true}
			onClick={() => setPage(page)}
			className={`${className} px-2 py-1 hover:bg-indigo-500 border hover:text-white font-semibold border-indigo-500`}
		>
			{children}
		</button>
	);
};

const Products = ({productList}) => {
	const dispatch = useDispatch();
	const initialFilter = {
		category: "",
		brand: "",
	};
	const initialSort = {
		by: "",
		order: "",
	};
	const [filter, setFilter] = useState(initialFilter);
	const [sort, setSort] = useState(initialSort);

	const {first, items, last, next, pages, prev} = useSelector(selectPagination);

	const [page, setPage] = useState(1);

	const handleFilter = (e) => {
		let newFilter = {
			...filter,
			[e.target.name]: e.target.value,
		};
		if (e.target.name === "category") {
			newFilter.brand = "";
		}
		setFilter(newFilter);
	};

	const resetFilter = () => setFilter(initialFilter);

	const handleSort = (e) => {
		const newSort = {...sort, [e.target.name]: e.target.value};
		setSort(newSort);
	};
	const resetSort = () => setSort(initialSort);
	const [showMenu, setShowMenu] = useState(false);
	useEffect(() => {
		setPage(1);
	}, [filter, sort]);

	useEffect(() => {
		dispatch(fetchProductsByFilterAsync({filter, sort, page}));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter, sort, page]);

	return (
		<div className="relative flex flex-col items-stretch">
			<div className="sticky top-0 left-0 z-50 flex flex-row-reverse justify-between p-3 px-5 bg-slate-200">
				<LuMenu
					className="text-3xl"
					onClick={() => setShowMenu((prev) => !prev)}
				/>
				<h3 className="text-2xl font-jose">
					{filter.q
						? `Showing results for ${filter.q}`
						: `Showing all products`}
				</h3>
			</div>
			<Filters
				filter={filter}
				sort={sort}
				handleFilter={handleFilter}
				handleSort={handleSort}
				resetFilter={resetFilter}
				resetSort={resetSort}
				show={showMenu}
				setShow={setShowMenu}
			/>

			{productList}

			<div className="flex justify-center m-2 border">
				<PageBtn page={prev} setPage={setPage}>
					<LuChevronLeft />
				</PageBtn>
				<PageNum page={prev} setPage={setPage}>
					{prev}
				</PageNum>
				<PageNum
					page={page}
					setPage={setPage}
					className="text-white bg-indigo-500"
				>
					{page}
				</PageNum>
				<PageNum page={next} setPage={setPage}>
					{next}
				</PageNum>
				<PageBtn page={next} setPage={setPage}>
					<LuChevronRight />
				</PageBtn>
			</div>
		</div>
	);
};

export default Products;
