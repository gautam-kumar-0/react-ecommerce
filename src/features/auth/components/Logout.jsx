import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetUser} from "../authSlice";
import useUser from "../../../hooks/useUser";
import {Navigate} from "react-router-dom";

const Logout = () => {
	const dispatch = useDispatch();
	const user = useUser("Logout");

	useEffect(() => {
		dispatch(resetUser());
	}, [dispatch]);
	console.log("Logout:", user);
	return !user?.name && <Navigate to={"/"} />;
};

export default Logout;
