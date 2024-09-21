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
	accessToken: "",
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetUser: (state) => (state = initialState),
	},
	extraReducers: (builder) => {
		builder.addCase(createUserAsync.fulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken;
		});
		builder.addCase(checkUserAsync.fulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.error = null;
		});
		builder.addCase(checkUserAsync.rejected, (state, action) => {
			state.error = action.error;
		});
	},
});

export const selectAuth = (state) => state.auth.accessToken;
export const {resetUser} = authSlice.actions;
export default authSlice.reducer;
