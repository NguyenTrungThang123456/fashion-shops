import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { listOrderMine } from "../actions/orderActions";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function OrderHistoryScreen(props) {
  const { enqueueSnackbar } = useSnackbar();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, error, enqueueSnackbar]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL ($)</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell>DELIVERED</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.shippingAddress.fullName}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                </TableCell>
                <TableCell>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
