import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SyncLoader} from "react-spinners";
import {resetAdminProduct} from "../features/adminProduct/adminProductSlice";

const AdminProductForm = ({onSubmit, values, resetName}) => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: {errors},
		setValue,
		reset,
	} = useForm({values});
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const {product, status, error} = useSelector((state) => state.adminProduct);
	const navigate = useNavigate();

	useEffect(() => {
		if (status === "fulfilled" && product) {
			navigate(`/admin/product/${product}`, {replace: false});
		} else if (status === "rejected") {
			setError(error);
			console.log(error);
		} else if (status === "pending") {
			setShow(true);
		} else {
			setShow(false);
			clearErrors();
		}
		return () => {
			if (status === "fulfilled") dispatch(resetAdminProduct());
		};
	}, [product, status, navigate]);

	return (
		<section className="flex justify-center p-4 text-lg font-geo">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-8 px-6 py-6 gap-y-8"
			>
				<label
					htmlFor=""
					className="flex flex-wrap col-span-6 gap-3 text-gray-600 "
				>
					<span className="basis-full">Title</span>
					<input
						type="text"
						{...register("title", {required: "Title is required"})}
						className="text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
					/>
					{errors.title && (
						<p className="self-center px-4 text-base font-light text-black bg-rose-200">
							{errors.title.message}
						</p>
					)}
				</label>
				<label
					htmlFor="description"
					className="flex flex-wrap col-span-6 gap-3 text-gray-600 "
				>
					<span className="basis-full">Description</span>
					<textarea
						rows={3}
						cols={9}
						placeholder="Describe the product"
						id="description"
						{...register("description", {required: "Description is required"})}
						className="p-2 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none focus:border-indigo-600"
					/>
					{errors.description && (
						<p className="self-center px-4 text-base font-light text-black bg-rose-200">
							{errors.description.message}
						</p>
					)}
				</label>
				<div className="flex col-span-6 gap-12">
					<label htmlFor="price" className="flex flex-col gap-1">
						<span>Price</span>
						<input
							type="number"
							id="price"
							{...register("price", {required: true, min: 0})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>{" "}
					</label>
					<label htmlFor="stock" className="flex flex-col gap-1">
						<span>Stock</span>
						<input
							type="number"
							id="stock"
							{...register("stock", {required: true, min: 0})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
					<label htmlFor="discount" className="flex flex-col gap-1">
						<span>Discount</span>
						<input
							type="number"
							id="discount"
							{...register("discount", {required: true, min: 0})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
				</div>

				<div className="flex col-span-6 gap-24">
					<label htmlFor="brand" className="flex gap-2">
						<span className="p-1">Brand</span>
						<input
							name="brand"
							id="brand"
							{...register("brand", {required: true})}
							className="p-1 text-indigo-600 border-2 border-gray-300 rounded-none focus:outline-none "
						/>
					</label>
					<label htmlFor="category" className="flex gap-2 ">
						<span className="p-1">Category</span>
						<input
							name=""
							id="category"
							{...register("category", {required: true})}
							className="p-1 text-indigo-600 border-2 border-gray-300 focus:outline-none "
						/>
					</label>
				</div>
				<div className="grid justify-around grid-cols-3 col-span-8 gap-4 border">
					<label
						htmlFor="thumbnail"
						className="flex flex-col col-span-1 gap-2 px-2"
					>
						<span>Thumbnail</span>
						<input
							type="text"
							id="thumbnail"
							{...register("thumbnail", {required: true})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
					<label
						htmlFor="image1"
						className="flex flex-col col-span-1 gap-2 px-2"
					>
						<span>Image 1</span>
						<input
							type="text"
							id="image1"
							{...register("image1", {required: true})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
					<label
						htmlFor="image2"
						className="flex flex-col col-span-1 gap-2 px-2"
					>
						<span>Image 2</span>
						<input
							type="text"
							id="image2"
							{...register("image2", {required: true})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
					<label
						htmlFor="image3"
						className="flex flex-col col-span-1 gap-2 px-2"
					>
						<span>Image 3</span>
						<input
							type="text"
							id="image3"
							{...register("image3", {required: true})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
					<label
						htmlFor="image4"
						className="flex flex-col col-span-1 gap-2 px-2"
					>
						<span>Image 4</span>
						<input
							type="text"
							id="image4"
							{...register("image4", {required: true})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
					<label
						htmlFor="image5"
						className="flex flex-col col-span-1 gap-2 px-2"
					>
						<span>Image 5</span>
						<input
							type="text"
							id="image5"
							{...register("image5", {required: true})}
							className="p-1 text-gray-800 border-2 border-gray-300 basis-1/2 focus:outline-none "
						/>
					</label>
				</div>
				<div className="col-span-8">
					{!!Object.keys(errors).length && (
						<p className="self-center px-4 text-base font-light text-black bg-rose-200">
							All fields are required!
						</p>
					)}
				</div>
				<div className="flex gap-24 ">
					<input
						type="submit"
						value={"Save"}
						className="px-6 py-2 text-lg font-semibold text-gray-100 rounded-full font-geo bg-emerald-500 hover:bg-emerald-600 ring-0 ring-green-400 focus:ring-1"
					/>
					{show && (
						<div className="bg-green-600 ">
							<SyncLoader></SyncLoader>
							Saving Product..
						</div>
					)}
					<input
						type="button"
						value={resetName}
						onClick={() => reset()}
						className="px-6 py-2 text-lg font-semibold text-gray-100 rounded-full font-geo bg-rose-500 hover:bg-rose-600 ring-0 ring-rose-400 focus:ring-1"
					/>
				</div>
			</form>
		</section>
	);
};

export default AdminProductForm;
