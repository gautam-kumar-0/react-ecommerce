import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../features/ProductsList/productListSlice";
import cartReducer from "../features/cart/cartListSlice";
import wishReducer from "../features/wishlist/wishListSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		cart: cartReducer,
		wishlist: wishReducer,
		order: orderReducer,
		user: userReducer,
	},
});
