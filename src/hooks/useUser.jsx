import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	clearUser,
	fetchUserAsync,
	selectUser,
} from "../features/user/userSlice";
import {selectUserId} from "../features/auth/authSlice";

const useUser = (c) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const user = useSelector(selectUser);
	useEffect(() => {
		console.log("useUser:", userId, c);
		let promise = null;
		if (userId) {
			promise = dispatch(fetchUserAsync(userId));
		} else dispatch(clearUser());
		return () => {
			if (promise) promise.abort();
		};
	}, [userId]);

	return user;
};

export default useUser;
