import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protected = ({children}) => {
	const location = useLocation();
	const userId = useAuth().id;
	return userId ? (
		children
	) : (
		<Navigate to={"/login"} state={{from: location}} />
	);
};

export default Protected;
