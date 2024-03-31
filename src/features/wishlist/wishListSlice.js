import {createSelector, createSlice} from "@reduxjs/toolkit";

const initialState = {
	wishlist: {},
};
export const wishSlice = createSlice({
	name: "wish",
	initialState,
	reducers: {
		addW: (state, action) => {
			state.wishlist[action.payload.id] = 1;
		},

		removeW: (state, action) => {
			delete state.wishlist[action.payload.id];
		},
	},
});

export const selectWish = (state) => state.wishlist.wishlist;
export const selectWishById = createSelector(
	selectWish,
	(state, productId) => productId,
	(wishlist, productId) => wishlist[productId]
);
export const {addW, removeW} = wishSlice.actions;
export default wishSlice.reducer;
