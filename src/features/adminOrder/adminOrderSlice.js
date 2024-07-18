import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {fetchOrderByFilter} from "./adminOrderApi";

const initialState = {
	orders: [],
	status: "idle",
	error: null,
};
export const fetchOrderByFilterAsync = createAsyncThunk(
	"adminOrder/fetch",
	async (params) => {
		const response = await fetchOrderByFilter(params);
		return response.data;
	}
);
export const updateOrderByIdAsync = createAsyncThunk(
	"adminOrder/update",
	async (params) => {
		const response = await fetchOrderByFilter(params);
		return response.data;
	}
);
export const orderSlice = createSlice({
	name: "admin/order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderByFilterAsync.pending, (state, action) => {
				state.status = "pending";
			})
			.addCase(fetchOrderByFilterAsync.fulfilled, (state, action) => {
				state.orders = action.payload.data;
				console.log("Order Fetch success: ", action.payload.data);
				state.status = "fulfilled";
			})
			.addCase(updateOrderByIdAsync.fulfilled, (state, action) => {
				state.orders = action.payload.data;
				console.log("Order Fetch success: ", action.payload.data);
				state.status = "fulfilled";
			});
	},
});

export const selectAdminOrder = (state) => state.adminOrder;

export default orderSlice.reducer;
