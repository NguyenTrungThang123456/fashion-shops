import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
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
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
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
    props.history.push("/signin?redirect=shipping");
  };
  return (
    // <div className='row top'>
    //   <div className='col-2'>
    //     <h1>Shopping Cart</h1>
    //     {cartItems.length === 0 ? (
    //       <MessageBox>
    //         Cart is empty. <Link to='/'>Go Shopping</Link>
    //       </MessageBox>
    //     ) : (
    //       <ul>
    //         {cartItems.map((item) => (
    //           <li key={item.product}>
    //             <div className='row'>
    //               <div>
    //                 <img
    //                   src={item.image}
    //                   alt={item.name}
    //                   className='small'
    //                 ></img>
    //               </div>
    //               <div className='min-30'>
    //                 <Link to={`/product/${item.product}`}>{item.name}</Link>
    //               </div>
    //               <div>
    //                 <select
    //                   value={item.qty}
    //                   onChange={(e) =>
    //                     dispatch(
    //                       addToCart(item.product, Number(e.target.value))
    //                     )
    //                   }
    //                 >
    //                   {[...Array(item.countInStock).keys()].map((x) => (
    //                     <option key={x + 1} value={x + 1}>
    //                       {x + 1}
    //                     </option>
    //                   ))}
    //                 </select>
    //               </div>
    //               <div>${item.price}</div>
    //               <div>
    //                 <button
    //                   type='button'
    //                   onClick={() => removeFromCartHandler(item.product)}
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    //   <div className='col-1'>
    //     <div className='card card-body'>
    //       <ul>
    //         <li>
    //           <h2>
    //             Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
    //             {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
    //           </h2>
    //         </li>
    //         <li>
    //           <button
    //             type='button'
    //             onClick={checkoutHandler}
    //             className='primary block'
    //             disabled={cartItems.length === 0}
    //           >
    //             Proceed to Checkout
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

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
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{ccyFormat(item.price)}</TableCell>
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
                    {ccyFormat(
                      cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                    )}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow> */}
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
