import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserAsync, selectUser} from "../features/user/userSlice";
import useAuth from "./useAuth";

const useUser = () => {
	const dispatch = useDispatch();
	const userId = useAuth();
	useEffect(() => {
		dispatch(fetchUserAsync(userId));
	}, [dispatch, userId]);

	const user = useSelector(selectUser);

	return user;
};

export default useUser;
