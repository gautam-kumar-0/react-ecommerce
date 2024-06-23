import Image from "../../../components/Image";
import {LuShoppingCart} from "react-icons/lu";
import Rating from "../../../components/Rating";
import Button1 from "../../../components/Button1";
import Button2 from "../../../components/Button2";
import Heart from "../../../components/Heart";
import {useDispatch, useSelector} from "react-redux";
import {addToCartAsync as add, selectCart} from "../../cart/cartListSlice";
import {TiShoppingCart} from "react-icons/ti";
import {addW, removeW, selectWishById} from "../../wishlist/wishListSlice";
import {useLocation, useNavigate} from "react-router-dom";
import useUser from "../../../hooks/useUser";

const ProductCard = ({product}) => {
	const wishlist = useSelector((state) => selectWishById(state, product.id));
	const user = useUser();
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const location = useLocation();
	const toggleWish = () => {
		if (wishlist) dispatch(removeW({id: product.id}));
		else dispatch(addW({id: product.id}));
	};
	const navigate = useNavigate();
	if (!product) {
		return <p>Loading</p>;
	}
	return (
		<div className=" border dark:border-white/20 relative my-4 text-indigo-600 rounded-md transition-all bg-white cursor-pointer dark:bg-black shadow-[0_0_0_1px_rgba(124,65,224,.1)]  dark:text-indigo-300 font-jose flex-1 ">
			<div className="flex-1 h-full flex flex-col justify-between rounded-[inherit] overflow-hidden">
				<div
					onClick={() => navigate(`/product/${product.id}`)}
					className="relative text-6xl bg-gray-100 h-60"
				>
					<Image image={product.thumbnail} index={0} />
				</div>
				<div className="py-1 text-gray-800 dark:text-gray-100">
					<h1 className="m-2 text-2xl text-center line-clamp-2 font-geo">
						{product.title}
					</h1>
				</div>
				<div className="flex flex-col gap-3 px-3 py-1 ">
					<p className="font-light text-gray-500 dark:text-gray-300 line-clamp-2">
						{product.description}
					</p>
					<h2 className="flex flex-row justify-between text-lg ">
						<span className="text-gray-500 dark:text-gray-300">Price</span>
						<span className="text-2xl font-semibold font-geo">
							<span className="mr-1 font-light font-jose bg-none text-emerald-400">
								$
							</span>
							{(
								product.price -
								(product.price * product.discountPercentage) / 100
							).toFixed(2)}
						</span>
					</h2>
				</div>
				<div className="flex flex-row justify-between px-2 ">
					<Rating rating={product.rating} />
					<Heart liked={wishlist} onClick={toggleWish} />
				</div>
				<div className="flex flex-row items-stretch justify-between gap-3 mt-3 bg-gradient-lr from-violet-300/30 to-indigo-300/30 dark:bg-none">
					<Button1
						onClick={() => navigate(`/product/${product.id}`)}
						className={"rounded-r-full pr-8"}
					>
						View
					</Button1>
					<Button2
						onClick={() => {
							if (user.id) {
								dispatch(
									add({product: product.id, user: user.id, quantity: 1})
								);
							} else {
								navigate("/login", {state: {from: location}});
							}
						}}
						className={"rounded-l-full "}
					>
						{Object.keys(cart).find((c) => c === product.id) ? (
							<TiShoppingCart />
						) : (
							<LuShoppingCart />
						)}
					</Button2>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
