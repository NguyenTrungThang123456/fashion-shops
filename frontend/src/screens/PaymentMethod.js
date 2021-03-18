import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  useEffect(() => {
    console.log(paymentMethod);
  }, [paymentMethod]);
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={paymentMethod}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Credit Card"
          />
        </RadioGroup>
      </FormControl>
      <Grid container spacing={3}>
        {paymentMethod === "credit" ? (
          <>
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
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Remember credit card details for next time"
              />
            </Grid>
          </>
        ) : (
          paymentMethod === "paypal" && (
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Payment information via Paypal will be filled in later
              </Typography>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
}
