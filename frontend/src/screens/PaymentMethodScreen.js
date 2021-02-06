import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    // <div>
    //   <CheckoutSteps step1 step2 step3></CheckoutSteps>
    //   <form className='form' onSubmit={submitHandler}>
    //     <div>
    //       <h1>Payment Method</h1>
    //     </div>
    //     <div>
    //       <div>
    //         <input
    //           type='radio'
    //           id='paypal'
    //           value='PayPal'
    //           name='paymentMethod'
    //           required
    //           checked
    //           onChange={(e) => setPaymentMethod(e.target.value)}
    //         ></input>
    //         <label htmlFor='paypal'>PayPal</label>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <input
    //           type='radio'
    //           id='stripe'
    //           value='Stripe'
    //           name='paymentMethod'
    //           required
    //           onChange={(e) => setPaymentMethod(e.target.value)}
    //         ></input>
    //         <label htmlFor='stripe'>Stripe</label>
    //       </div>
    //     </div>
    //     <div>
    //       <label />
    //       <button className='primary' type='submit'>
    //         Continue
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
