import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addProduct} from "./adminProductApi";

export const addProductsAsync = createAsyncThunk(
	"adminProduct/addProduct",
	async (product) => {
		const response = await addProduct(product);
		return response.data;
	}
);
const initialState = {
	product: {},
	error: null,
	status: "idle" | "pending" | "rejected" | "fulfilled",
};
export const adminProduct = createSlice({
	name: "adminProduct",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addProductsAsync.pending, (state, action) => {
				state.status = "pending";
			})
			.addCase(addProductsAsync.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error;
			})
			.addCase(addProductsAsync.fulfilled, (state, action) => {
				state.status = "fulfilled";
				state.product = action.payload;
			});
	},
});

export default adminProduct.reducer;
