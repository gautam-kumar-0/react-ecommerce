import {useDispatch, useSelector} from "react-redux";
import {
	deleteProductsAsync,
	resetAdminProduct,
	updateProductsAsync,
} from "../features/adminProduct/adminProductSlice";
import AdminProductForm from "../components/AdminProductForm";
import {useNavigate, useParams} from "react-router-dom";
import {getProductById} from "../features/ProductsList/productListSlice";
import {TiDelete} from "react-icons/ti";
import {useEffect} from "react";

const AdminProductEdit = () => {
	const dispatch = useDispatch();

	const {productId} = useParams();
	const product = useSelector((state) => getProductById(state, productId));
	console.log(product, productId);
	const values = {
		...product,
		image1: product?.images[0],
		image2: product?.images[1],
		image3: product?.images[2],
		image4: product?.images[3],
		image5: product?.images[4],
	};
	const onSubmit = (data) => {
		console.log(data);
		const newproduct = {
			...data,
			price: +data.price,
			stock: +data.stock,
			discountPercentage: +data.discountPercentage,
			id: product.id,
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
		dispatch(updateProductsAsync({...newproduct, images}));
	};
	const handleDelete = () => {
		dispatch(deleteProductsAsync(productId));
	};
	const navigate = useNavigate();
	const {status} = useSelector((state) => state.adminProduct);
	useEffect(() => {
		if (status === "deleted") navigate("/admin/products");
		return () => {
			dispatch(resetAdminProduct());
		};
	}, [status, navigate]);

	return (
		<div className="px-4">
			<h1 className="text-2xl font-bold">Edit Product</h1>
			<AdminProductForm
				onSubmit={onSubmit}
				values={values}
				resetName={"Clear Changes"}
			/>
			<button onClick={handleDelete}>
				<TiDelete />
			</button>
		</div>
	);
};

export default AdminProductEdit;
