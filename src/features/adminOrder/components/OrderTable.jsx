import * as React from "react";

// composed table

import {useTheme} from "@table-library/react-table-library/theme";
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
import {table_theme} from "./theme.js";
import {format} from "date-fns";
import OrderList from "../../order/components/OrderList";
import OrderItem from "../../order/components/OrderItem.jsx";
import {TbEdit, TbEye} from "react-icons/tb";
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
		}
		// else {
		// 	console.log("not dispatched:", params, status);
		// }
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
	const theme = useTheme(table_theme);

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
		<Table data={data} sort={sort} theme={theme}>
			{(tableList) => (
				<>
					<Header>
						<HeaderRow>
							<HeaderCell>Order Id</HeaderCell>
							<HeaderCellSort sortKey="itmes">Product</HeaderCellSort>
							<HeaderCellSort sortKey="user">User</HeaderCellSort>
							<HeaderCellSort sortKey="status">Status</HeaderCellSort>
							<HeaderCellSort sortKey="createdAt">
								Order Placement
							</HeaderCellSort>

							<HeaderCell>Actions</HeaderCell>
						</HeaderRow>
					</Header>

					<Body>
						{tableList.map((item) => (
							<Row key={item.id} item={item}>
								<Cell>#{item.id}</Cell>
								<Cell>
									<OrderItem
										productId={Object.keys(item.items)[0]}
										size={"w-12 h-12"}
									/>
								</Cell>
								<Cell>{item?.shippingAddress?.email}</Cell>
								<Cell className="capitalize">{item.status}</Cell>
								<Cell>
									<div className="flex flex-col">
										<span>{format(item.createdAt, "yyyy-MM-dd")}</span>
										<span className="text-xs ">
											{format(item.createdAt, "hh:mm:ss")}
										</span>
									</div>
								</Cell>
								<Cell>
									<div className="flex gap-4 text-2xl ">
										<TbEye /> <TbEdit />
									</div>
								</Cell>
							</Row>
						))}
					</Body>
				</>
			)}
		</Table>
	);
};
export default OrderTable;
