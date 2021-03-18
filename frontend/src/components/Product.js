import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export default function Product(props) {
  const { product } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Link to={`/product/${product._id}`}>
        <CardMedia className={classes.media} image={product.image} />
      </Link>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </Typography>
        <Rating readOnly value={product.rating} size="small" />
        <Typography>
          <b>$ {product.price} </b>
        </Typography>
      </CardContent>
    </Card>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    // border: "none",
    borderRadius: 0,
    "&:hover": {
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },

  title: {
    fontSize: 14,
    color: "black",
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
}));
