import "./App.css";
import NavBar from "./features/NavBar/NavBar";

import CartList from "./features/cart/components/CartList";
import Home from "./pages/Home";
import {useRoutes} from "react-router-dom";
import Login from "./pages/Login";
import WishList from "./features/wishlist/WishList";
import Protected from "./components/Protected";
import Signup from "./pages/Signup";
import ProductItem from "./features/ProductsList/components/ProductItem";
import {products} from "./features/ProductsList/productListApi";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllProductsAsync} from "./features/ProductsList/productListSlice";
import ProductCard from "./features/ProductsList/components/ProductCard";
import User from "./pages/User";
import OrderHistory from "./pages/OrderHistory";
import {fetchCartAsync} from "./features/cart/cartListSlice";
import useAuth from "./hooks/useAuth";
import OrderStatus from "./pages/OrderStatus";
import OrderProcess from "./pages/OrderProcess";
import {fetchOrderByUserAsync} from "./features/order/orderSlice";

import {fetchUserAsync} from "./features/user/userSlice";
import AddressPage from "./features/user/components/AddressPage";
import Profile from "./pages/Profile";
import Logout from "./features/auth/components/Logout";
import Forgot from "./features/auth/components/Forgot";
import ProtectedAdmin from "./components/ProtectedAdmin";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminProducts from "./pages/AdminProducts";
import UserProducts from "./pages/UserProducts";
import ProductItemAdmin from "./features/ProductsList/components/ProductItemAdmin";
import AdminOrders from "./pages/AdminOrders";
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, []);
	const userId = useAuth().id;

	useEffect(() => {
		if (userId) {
			dispatch(fetchUserAsync(userId));
			dispatch(fetchCartAsync(userId));
			dispatch(fetchOrderByUserAsync(userId));
		}
	}, [userId, dispatch]);

	const error = useSelector((state) => state.product.error);

	const routes = useRoutes([
		{path: "/", element: <Home />},

		{
			path: "/cart",
			element: (
				<Protected>
					<CartList />
				</Protected>
			),
		},
		{
			path: "/wishlist",
			element: (
				<Protected>
					<WishList />
				</Protected>
			),
		},
		{
			path: "/user",
			element: (
				<Protected>
					<User />
				</Protected>
			),
		},
		{
			path: "/user/profile",
			element: (
				<Protected>
					<Profile />
				</Protected>
			),
		},
		{
			path: "/user/addresses",
			element: (
				<Protected>
					<AddressPage />
				</Protected>
			),
		},
		{
			path: "/order/:orderId",
			element: (
				<Protected>
					<OrderStatus />
				</Protected>
			),
		},
		{
			path: "/order/processing",
			element: (
				<Protected>
					<OrderProcess />
				</Protected>
			),
		},

		{
			path: "/order/history",
			element: (
				<Protected>
					<OrderHistory />
				</Protected>
			),
		},
		{path: "/login", element: <Login />},
		{
			path: "/logout",
			element: <Logout />,
		},
		{
			path: "/forgot",
			element: <Forgot />,
		},
		{path: "/register", element: <Signup />},
		{path: "/products", element: <UserProducts />},
		{path: "/product/:productId", element: <ProductItem />},

		{
			path: "/checkout",
			element: (
				<Protected>
					<Checkout />
				</Protected>
			),
		},
		{
			path: "admin/products/new",
			element: <AdminAddProduct />,
		},
		{
			path: "/admin/products/:productId",
			element: <ProductItemAdmin />,
		},
		{
			path: "/admin/products/edit/:productId",
			element: <AdminProductEdit />,
		},
		{
			path: "/admin/products",
			element: <AdminProducts />,
		},
		{
			path: "/admin/orders",
			element: <AdminOrders />,
		},
	]);

	return (
		<>
			{error ? (
				<div>
					<h1>Something Went Wrong! {error.message}</h1>
				</div>
			) : (
				<div className="font-sans dark:bg-black dark:text-gray-100">
					<NavBar />
					{routes}
				</div>
			)}
		</>
	);
}

export default App;
