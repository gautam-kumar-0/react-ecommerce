import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {fetchAllProducts} from "./productListApi";
import {fetchProductByFilter} from "./productListApi";

const initialState = {
	products: [],
	category: {},
	pagination: {},
	error: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
	"product/fetchAllProduct",
	async () => {
		const response = await fetchAllProducts();
		return response.data;
	}
);

export const fetchProductsByFilterAsync = createAsyncThunk(
	"product/fetchProductByFilter",
	async ({filter, sort, page}) => {
		const {data: products, ...pagination} = await fetchProductByFilter(
			filter,
			sort,
			page
		);

		return {products, pagination};
	}
);

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		add: () => {},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
			state.products = action.payload;
			action.payload.forEach((p) => {
				if (state.category[p.category]) {
					state.category[p.category].push(p.brand);
				} else {
					state.category[p.category] = [p.brand];
				}
			});
		});
		builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
			state.products = action.payload.products;
			state.pagination = action.payload.pagination;
		});
	},
});

export const selectAllProducts = (state) => state.product.products;
export const selectCategory = (state) => state.product.category;
export const selectPagination = (state) => state.product.pagination;

// First, create a simple selector that gets the products state.

// Then, create a selector that takes the products state and an ID, and returns the product with that ID.
export const getProductById = createSelector(
	selectAllProducts,
	(state, productId) => productId,
	(products, productId) =>
		products.find((product) => Number(product.id) === Number(productId))
);
export const getProductByIds = createSelector(
	selectAllProducts,
	(state, productIds) => productIds,
	(products, productIds) => {
		return products.filter((product) =>
			productIds.some((id) => Number(id) === Number(product.id))
		);
	}
);

export const getBrands = createSelector(
	selectCategory,
	(state, c) => c,
	(category, c) => {
		return [...new Set(category[c])];
	}
);

export default productSlice.reducer;
