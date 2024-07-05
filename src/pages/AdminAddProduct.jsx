import {useDispatch} from "react-redux";
import {addProductsAsync} from "../features/adminProduct/adminProductSlice";
import AdminProductForm from "../components/AdminProductForm";

const AdminAddProduct = () => {
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		console.log(data);
		const newproduct = {
			...data,
			price: +data.price,
			stock: +data.stock,
			discountPercentage: +data.discountPercentage,
			rating: 0,
		};
		const images = [
			data.image1,
			data.image2,
			data.image3,
			data.image4,
			data.image5,
		];
		delete newproduct.image1;
		delete newproduct.image2;
		delete newproduct.image3;
		delete newproduct.image4;
		delete newproduct.image5;
		dispatch(addProductsAsync({...newproduct, images}));
	};

	return (
		<div className="px-4">
			<h1 className="text-2xl font-bold">Add New Product</h1>
			<AdminProductForm onSubmit={onSubmit} resetName={"Reset"} />
		</div>
	);
};

export default AdminAddProduct;
