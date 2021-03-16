import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Container,
  makeStyles,
  Button,
  CircularProgress,
  Snackbar,
  LinearProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
    if (errorUpdate) {
      enqueueSnackbar(errorUpdate, { variant: "error" });
    } else if (successUpdate) {
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
    }
  }, [
    dispatch,
    userInfo._id,
    user,
    enqueueSnackbar,
    errorUpdate,
    successUpdate,
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      enqueueSnackbar("Password and Confirm Password Are Not Matched", {
        variant: "error",
      });
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <Container maxWidth="xs">
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              variant="outlined"
              label="Name"
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              label="Password"
              fullWidth
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <TextField
              label="Confirm Password"
              margin="normal"
              variant="outlined"
              fullWidth
              id="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
            {loadingUpdate && <LinearProgress variant="determinate" />}
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              variant="contained"
              type="submit"
              // onClick={}
              disabled={loadingUpdate ? true : false}
            >
              Update
            </Button>
          </>
        )}
      </form>
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
