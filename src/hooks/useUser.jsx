import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	clearUser,
	fetchUserAsync,
	selectUser,
} from "../features/user/userSlice";
import {selectUserId} from "../features/auth/authSlice";

const useUser = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const user = useSelector(selectUser);
	useEffect(() => {
		console.log("useUser:", userId);
		let promise = null;
		if (userId) {
			promise = dispatch(fetchUserAsync(userId));
		} else dispatch(clearUser());
		return () => {
			if (promise) promise.abort();
		};
	}, [dispatch, userId]);

	return user;
};

export default useUser;
