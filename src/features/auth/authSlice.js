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
export const updateUserAsync = createAsyncThunk("auth/update", async (args) => {
	const response = await updateUser(args);
	return response.data;
});

const initialState = {
	user: {},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createUserAsync.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(checkUserAsync.fulfilled, (state, action) => {
			state.user = action.payload;
			state.user.error = null;
		});
		builder.addCase(checkUserAsync.rejected, (state, action) => {
			state.user.error = action.error;
		});
		builder.addCase(updateUserAsync.fulfilled, (state, action) => {
			state.user = action.payload;
		});
	},
});

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
