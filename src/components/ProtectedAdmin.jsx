import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/authSlice";

const ProtectedAdmin = ({children}) => {
	const location = useLocation();
	const user = useSelector(selectUser);

	if (!user?.id || user.role !== "admin") {
		return <Navigate to={"/admin/login"} state={{from: location}} />;
	}
	return children;
};

export default ProtectedAdmin;
