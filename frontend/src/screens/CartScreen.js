import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}
export default function CartScreen(props) {
  const classes = useStyles();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=checkout");
  };
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Sum</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">
                      ${ccyFormat(item.price)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    <b>
                      $
                      {ccyFormat(
                        cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                      )}
                    </b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
