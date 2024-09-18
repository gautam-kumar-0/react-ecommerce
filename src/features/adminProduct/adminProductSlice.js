import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addProduct, deleteProduct, updateProduct} from "./adminProductApi";

export const addProductsAsync = createAsyncThunk(
	"adminProduct/addProduct",
	async (product) => {
		const response = await addProduct(product);
		return response.data;
	}
);

export const updateProductsAsync = createAsyncThunk(
	"adminProduct/updateProduct",
	async (product) => {
		const response = await updateProduct(product);
		return response.data;
	}
);
export const deleteProductsAsync = createAsyncThunk(
	"adminProduct/deleteProduct",
	async (productId) => {
		const response = await deleteProduct(productId);
		return response.data;
	}
);

const initialState = {
	product: "",
	error: null,
	status: "idle", //| "pending" | "rejected" | "fulfilled",
};
export const adminProduct = createSlice({
	name: "adminProduct",
	initialState,
	reducers: {
		resetAdminProduct: () => initialState,
	},
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
				console.log("Admin Product Builder Case: ", action.payload);
				state.product = action.payload._id;
				state.status = "fulfilled";
			})
			.addCase(updateProductsAsync.pending, (state, action) => {
				state.status = "pending";
			})
			.addCase(updateProductsAsync.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error;
			})
			.addCase(updateProductsAsync.fulfilled, (state, action) => {
				state.product = action.payload?.id;
				console.log("Admin Product Builder Case: ", action.payload);
				state.status = "fulfilled";
			})
			.addCase(deleteProductsAsync.pending, (state, action) => {
				state.status = "pending";
			})
			.addCase(deleteProductsAsync.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error;
			})
			.addCase(deleteProductsAsync.fulfilled, (state, action) => {
				state.status = "deleted";
				state.product = action.payload;
			});
	},
});

export const {resetAdminProduct} = adminProduct.actions;
export default adminProduct.reducer;
