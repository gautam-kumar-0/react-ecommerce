import {useSelector} from "react-redux";
import {selectUserId} from "../features/auth/authSlice";

const useAuth = () => {
	return useSelector(selectUserId);
};

export default useAuth;
