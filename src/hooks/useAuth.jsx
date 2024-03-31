import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/authSlice";

const useAuth = () => {
	return useSelector(selectUser);
};

export default useAuth;
