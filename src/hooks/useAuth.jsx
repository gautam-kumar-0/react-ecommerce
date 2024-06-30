import {useSelector} from "react-redux";
import {selectUserId} from "../features/auth/authSlice";

const useAuth = () => {
	const id = useSelector(selectUserId);
	return id;
};

export default useAuth;
