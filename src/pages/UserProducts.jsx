import React from "react";
import Products from "./Products";
import ProductList from "../features/ProductsList/components/ProductList";

const UserProducts = () => {
	return <Products productList={<ProductList />} />;
};

export default UserProducts;
