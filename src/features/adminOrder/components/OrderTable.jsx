import * as React from "react";

import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	HeaderCell,
	Cell,
} from "@table-library/react-table-library/table";
import {useSort, HeaderCellSort} from "@table-library/react-table-library/sort";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderByFilterAsync, selectAdminOrder} from "../adminOrderSlice";
import {
	fetchProductsByFilterAsync,
	getProductById,
} from "../../ProductsList/productListSlice";
import {format, formatRelative} from "date-fns";
import OrderList from "../../order/components/OrderList";
const OrderTable = () => {
	const [data, setData] = React.useState({
		nodes: [],
	});

	// initial fetching
	const {orders, status} = useSelector(selectAdminOrder);
	const dispatch = useDispatch();
	const [params, setParams] = React.useState({});

	React.useEffect(() => {
		if (status !== "pending") {
			dispatch(fetchOrderByFilterAsync(params));
			console.log("dispatch", params);
		} else {
			console.log("not dispatched:", params, status);
		}
	}, [params, dispatch]);

	const doGet = (params) => {
		setParams(params);
		console.log("doget", params);
	};

	React.useEffect(() => {
		setData({nodes: [...orders]});
		console.log(data);
	}, [status]);

	// features

	const sort = useSort(
		data,
		{
			onChange: onSortChange,
		},
		{
			isServer: true,
		}
	);

	function onSortChange(action, state) {
		const params = {
			sort: {
				sortKey: state.sortKey,
				reverse: state.reverse,
			},
		};

		doGet(params);
	}

	return (
		<Table data={data} sort={sort}>
			{(tableList) => (
				<>
					<Header>
						<HeaderRow>
							<HeaderCellSort sortKey="TASK">Task</HeaderCellSort>
							<HeaderCellSort sortKey="DEADLINE">Deadline</HeaderCellSort>
							<HeaderCellSort sortKey="TYPE">Type</HeaderCellSort>
							<HeaderCellSort sortKey="status">Status</HeaderCellSort>
							<HeaderCellSort sortKey="createdAt">TIME</HeaderCellSort>
						</HeaderRow>
					</Header>

					<Body>
						{tableList.map((item) => (
							<Row key={item.id} item={item}>
								<Cell>
									<OrderList ids={Object.keys(item.cart)} />
								</Cell>
								<Cell>{item.createdAt}</Cell>
								<Cell>{item?.shippingAddress?.name}</Cell>
								<Cell>{item.status}</Cell>
								<Cell>{format(item.createdAt, "yyyy-MM-dd")}</Cell>
							</Row>
						))}
					</Body>
				</>
			)}
		</Table>
	);
};
export default OrderTable;
