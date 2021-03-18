import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

export default function AddressForm(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    // props.history.push("/");
  };
  useEffect(() => {
    console.log(city);
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full name"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="full-name"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                onClick={submitHandler}
                name="saveAddress"
                value="yes"
              />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
