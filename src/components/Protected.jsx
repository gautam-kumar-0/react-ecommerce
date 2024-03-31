import React from "react";
import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";

const Protected = ({children}) => {
	const location = useLocation();
	const user = useAuth();
	return user.email ? (
		children
	) : (
		<Navigate to={"/login"} state={{from: location}} />
	);
};

export default Protected;
