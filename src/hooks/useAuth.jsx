import {useSelector} from "react-redux";
import {selectAuth} from "../features/auth/authSlice";
import {jwtDecode} from "jwt-decode";
const useAuth = () => {
	return jwtDecode(useSelector(selectAuth));
};

export default useAuth;
