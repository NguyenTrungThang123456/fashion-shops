import React, { useEffect } from "react";

import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Snackbar,
} from "@material-ui/core";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const classes = useStyles();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return loading ? (
    <CircularProgress className={classes.loading} />
  ) : error ? (
    <Snackbar open={error ? true : false} autoHideDuration={5000}>
      {error}
    </Snackbar>
  ) : (
    <Grid container spacing={2} justify="center" alignItems="center">
      {products.map((product) => (
        <Grid item key={product._id}>
          <Product key={product._id} product={product}></Product>
        </Grid>
      ))}
    </Grid>
  );
}

const useStyles = makeStyles({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
