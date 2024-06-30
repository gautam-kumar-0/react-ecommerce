import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchUserDetails, updateUser} from "./userApi";

export const fetchUserAsync = createAsyncThunk("user/fetch", async (args) => {
	const response = await fetchUserDetails(args);
	return response.data;
});

export const updateUserAsync = createAsyncThunk("user/update", async (args) => {
	const response = await updateUser(args);
	return response.data;
});

const initialState = {
	user: {},
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearUser(state) {
			state.user = initialState.user;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(updateUserAsync.fulfilled, (state, action) => {
			state.user = action.payload;
		});
	},
});

export const selectUser = (state) => state.user.user;
export const {clearUser} = userSlice.actions;

export default userSlice.reducer;
