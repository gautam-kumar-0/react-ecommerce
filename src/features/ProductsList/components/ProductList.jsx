import {useSelector} from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
	const products = useSelector((state) => state.product.products);
	const error = useSelector((state) => state.product.error);
	return (
		<div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 p-4 justify-center ring ">
			{products.map((product, i) => {
				return <ProductCard key={i} product={product} />;
			})}
			{products.length === 0 && (
				<>
					<h1>No Products found</h1>
					<span>{error}</span>
				</>
			)}
		</div>
	);
};

export default ProductList;
