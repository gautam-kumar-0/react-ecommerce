import React from "react";
import Products from "./Products";
import ProductListAdmin from "../features/ProductsList/components/ProductListAdmin";

const AdminProducts = () => {
	return <Products productList={<ProductListAdmin />} />;
};

export default AdminProducts;
