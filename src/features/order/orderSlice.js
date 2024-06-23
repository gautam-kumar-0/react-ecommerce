import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {
	cancelOrder,
	createOrder,
	fetchOrderById,
	fetchOrderByUser,
} from "./orderApi";

export const fetchOrderByUserAsync = createAsyncThunk(
	"order/fetch",
	async (userId) => {
		const response = await fetchOrderByUser(userId);
		return response.data;
	}
);
export const fetchOrderByIdAsync = createAsyncThunk(
	"order/fetchById",
	async (orderId) => {
		const response = await fetchOrderById(orderId);
		return response;
	}
);
export const createOrderAsync = createAsyncThunk(
	"order/create",
	async (order) => {
		const response = await createOrder(order);
		return response.data;
	}
);
export const cancelOrderAsync = createAsyncThunk(
	"order/cancel",
	async (orderId) => {
		const response = await cancelOrder(orderId);
		return response.data;
	}
);

const initialState = {
	orders: [],
	currentOrder: null,
	orderById: {},
	status: "idle",
	error: null,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		resetOrder: (state) => {
			state.currentOrder = null;
			state.error = null;
			state.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderByUserAsync.fulfilled, (state, action) => {
				state.orders = action.payload.sort((a, b) => b.createdAt - a.createdAt);
			})
			.addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
				state.orderById = action.payload;
			})
			.addCase(createOrderAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(createOrderAsync.fulfilled, (state, action) => {
				state.currentOrder = action.payload;
				state.status = "success";
			})
			.addCase(createOrderAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			});
	},
});
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectOrderState = (state) => state.order;
export const selectOrderById = (state) => state.order.orderById;
export const getOrderById = createSelector(
	selectOrders,
	(state, orderId) => orderId,
	(orders, orderId) => {
		let o = orders.find((order) => order.id === orderId);
		return o;
	}
);
export const {resetOrder} = orderSlice.actions;

export default orderSlice.reducer;
