import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
  CssBaseline,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { register } from "../actions/userActions";

export default function RegisterScreen(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar("Password and confirm password are not match", {
        variant: "error",
      });
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo, error, enqueueSnackbar]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {loading && <LinearProgress />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading ? true : false}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={`/signin?redirect=${redirect}`} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
