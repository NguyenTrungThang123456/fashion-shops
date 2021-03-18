import React, { useEffect } from "react";
import {
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.cartItems.map((item) => (
          <>
            <ListItem className={classes.listItem} key={item.product}>
              <ListItemText primary={item.name} secondary={item.description} />
              <Typography variant="body2">
                ${item.price} x {item.qty} = ${item.price * item.qty}
              </Typography>
            </ListItem>
            <Divider />
          </>
        ))}
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${cart.itemsPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{cart.shippingAddress.fullName}</Typography>
          <Typography
            gutterBottom
          >{`${cart.shippingAddress.address} ,${cart.shippingAddress.city} ,${cart.shippingAddress.country}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Method</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Paypal</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Status</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Not Paid</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
