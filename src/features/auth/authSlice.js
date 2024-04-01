import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createUser, updateUser} from "./authApi";
import {checkUser} from "./authApi";

export const createUserAsync = createAsyncThunk(
	"auth/register",
	async (user) => {
		const response = await createUser(user);
		return response.data;
	}
);
export const checkUserAsync = createAsyncThunk("auth/login", async (user) => {
	const response = await checkUser(user);
	return response.data;
});

const initialState = {
	user: null,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createUserAsync.fulfilled, (state, action) => {
			state.user = action.payload.id;
		});
		builder.addCase(checkUserAsync.fulfilled, (state, action) => {
			state.user = action.payload;
			state.error = null;
		});
		builder.addCase(checkUserAsync.rejected, (state, action) => {
			state.error = action.error;
		});
	},
});

export const selectUserId = (state) => state.auth.user;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
