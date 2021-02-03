import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
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
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
export default function RegisterScreen(props) {
  const classes = useStyles();
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
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    // <div>
    //   <form className='form' onSubmit={submitHandler}>
    //     <div>
    //       <h1>Create Account</h1>
    //     </div>
    //     {loading && <LoadingBox></LoadingBox>}
    //     {error && <MessageBox variant='danger'>{error}</MessageBox>}
    //     <div>
    //       <label htmlFor='name'>Name</label>
    //       <input
    //         type='text'
    //         id='name'
    //         placeholder='Enter name'
    //         required
    //         onChange={(e) => setName(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       <label htmlFor='email'>Email address</label>
    //       <input
    //         type='email'
    //         id='email'
    //         placeholder='Enter email'
    //         required
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       <label htmlFor='password'>Password</label>
    //       <input
    //         type='password'
    //         id='password'
    //         placeholder='Enter password'
    //         required
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       <label htmlFor='confirmPassword'>Confirm Password</label>
    //       <input
    //         type='password'
    //         id='confirmPassword'
    //         placeholder='Enter confirm password'
    //         required
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       <label />
    //       <button className='primary' type='submit'>
    //         Register
    //       </button>
    //     </div>
    //     <div>
    //       <label />
    //       <div>
    //         Already have an account?{' '}
    //         <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
    //       </div>
    //     </div>
    //   </form>
    // </div>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
