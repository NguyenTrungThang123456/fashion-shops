import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Rating } from "@material-ui/lab";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(null);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <Grid container>
            <Grid item xs={6}>
              <img src={product.image} alt={product.name}></img>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <h1>{product.name}</h1>
                </ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly />
                </ListItem>
                <ListItem>
                  <b>Price: ${product.price}</b>
                </ListItem>
                <ListItem>Description: {product.description}</ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <div className="row">
                    <div>Price: ${product.price}</div>
                  </div>
                </ListItem>
                <ListItem>
                  <div className="row">
                    <div>
                      Status:
                      {product.countInStock > 0 ? (
                        <span className="success"> In Stock</span>
                      ) : (
                        <span className="danger"> Unavailable</span>
                      )}
                    </div>
                  </div>
                </ListItem>
                {product.countInStock > 0 && (
                  <>
                    <ListItem>
                      <div className="row">
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-controlled-open-select-label">
                            Quantity
                          </InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            <MenuItem value={null}>
                              <em>None</em>
                            </MenuItem>
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Button
                        onClick={addToCartHandler}
                        variant="contained"
                        color="primary"
                        disabled={qty !== null ? false : true}
                      >
                        Add to Cart
                      </Button>
                    </ListItem>
                  </>
                )}
              </List>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
