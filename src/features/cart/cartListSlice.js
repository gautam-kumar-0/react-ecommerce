import {createSlice} from "@reduxjs/toolkit";

import {createAsyncThunk} from "@reduxjs/toolkit";
import {
	addToCart,
	decrementCart,
	fetchCart,
	removeFromCart,
	resetCart,
} from "./cartListApi";

export const fetchCartAsync = createAsyncThunk(
	"cart/fetchAsync",
	async (user) => {
		const response = await fetchCart(user);

		return response.data;
	}
);
export const addToCartAsync = createAsyncThunk(
	"cart/addAsync",
	async (item) => {
		const response = await addToCart(item);

		return response.data;
	}
);
export const decrementCartAsync = createAsyncThunk(
	"cart/decrementAsync",
	async (item) => {
		const response = await decrementCart(item);
		return response.data;
	}
);
export const removeFromCartAsync = createAsyncThunk(
	"cart/removeFromAsync",
	async (id) => {
		const response = await removeFromCart(id);
		return response.data;
	}
);
export const resetCartAsync = createAsyncThunk(
	"cart/resetCart",
	async (userId) => {
		const response = await resetCart(userId);
		return response.data;
	}
);
const initialState = {
	cart: {},
};
export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.cart[action.payload.product] = action.payload.quantity || 1;
			})
			.addCase(decrementCartAsync.fulfilled, (state, action) => {
				state.cart[action.payload.product] = action.payload.quantity || 1;
			})
			.addCase(removeFromCartAsync.fulfilled, (state, action) => {
				delete state.cart[action.payload.product];
			})
			.addCase(fetchCartAsync.fulfilled, (state, action) => {
				action.payload.forEach(
					(item) => (state.cart[item.product] = item.quantity)
				);
			})
			.addCase(resetCartAsync.fulfilled, (state, action) => {
				state.cart = initialState.cart;
			});
	},
});

export const selectCart = (state) => state.cart.cart;

export const {add, remove, decrement} = cartSlice.actions;
export default cartSlice.reducer;
