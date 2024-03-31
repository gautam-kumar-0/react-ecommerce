import {useSelector} from "react-redux";
import {selectCart} from "../features/cart/cartListSlice";
import {getProductByIds} from "../features/ProductsList/productListSlice";

const useCart = () => {
	const cart = useSelector(selectCart);
	const items = Object.keys(cart).length;
	const products = useSelector((state) =>
		getProductByIds(state, Object.keys(cart))
	);
	let total = 0;

	products.forEach((element) => {
		total += element.price * cart[element.id];
	});
	return {products, cart, total, items};
};

export default useCart;
