import {useSelector} from "react-redux";
import {selectOrderState} from "../features/order/orderSlice";

const useOrder = () => {
	const order = useSelector(selectOrderState);
	return order;
};

export default useOrder;
