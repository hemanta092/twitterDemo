import React, { useEffect, useState } from "react";
import "./Login.css";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import pic from "../resources/tweetlogo.png";
import { useSnackbar } from "notistack";
import {
  AccountCircle,
  Call,
  Lock,
  Mail,
  Person,
  Wc,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const Signup = () => {
  const classes = useStyles();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { signupResponse } = useSelector((state) => state.user);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    var valid = true;
    const form = {
      userId,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNo,
    };
    console.log(form);
    if (
      form.userId === "" ||
      form.password === "" ||
      form.firstName === "" ||
      form.lastName === "" ||
      form.dateOfBirth === "" ||
      form.gender === "" ||
      form.mobileNo === ""
    ) {
      valid = false;
      const variant = "error";
      enqueueSnackbar("Please fill all data!", { variant });
    }
    if (
      form.gender.toUpperCase() !== "MALE" &&
      form.gender.toUpperCase() !== "FEMALE" &&
      form.gender.toUpperCase() !== "OTHER"
    ) {
      valid = false;
      const variant = "error";
      enqueueSnackbar("Gender can be Male/Female or Other", { variant });
    }
    if (form.mobileNo.match("/^d{10}$/") === false) {
      valid = false;
      const variant = "error";
      enqueueSnackbar("Mobile Number must have 10 numbers only", { variant });
    }
    if (
      form.dateOfBirth !== "" &&
      new Date(form.dateOfBirth).toLocaleDateString() >
        new Date().toLocaleDateString()
    ) {
      valid = false;
      const variant = "error";
      enqueueSnackbar("Date cannot be a future date", { variant });
    }
    if (valid) {
      dispatch(
        signupRequest({
          body: form,
        })
      );
    }
  };

  useEffect(() => {
    if (signupResponse === "2") {
      const variant = "success";
      enqueueSnackbar("Sign Up Successfully!", { variant });
      navigate("/login");
    } else if (signupResponse === "3") {
      const variant = "error";
      enqueueSnackbar("UserID Already Exist", { variant });
    }
  }, [signupResponse, enqueueSnackbar, navigate]);

  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item sm={6} xs={12}>
          <img src={pic} alt="" className="logoimage" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div id="loginform">
            <h2 id="headerTitle">Sign Up</h2>
            <form
              className={classes.root}
              onSubmit={handleFormSubmit}
              noValidate
              autoComplete="off"
            >
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstname"
                label="First Name"
                variant="outlined"
                required
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                id="lastname"
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
                variant="outlined"
                required
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                variant="outlined"
                required
              />
              <TextField
                id="dob"
                onChange={(e) => setDateOfBirth(e.target.value)}
                label="Date of Birth"
                type="date"
                variant="outlined"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Wc />
                    </InputAdornment>
                  ),
                }}
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                variant="outlined"
                required
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Call />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setMobileNo(e.target.value)}
                id="mobile"
                label="Mobile Number"
                variant="outlined"
                required
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
                id="email"
                onChange={(e) => setUserId(e.target.value)}
                type="email"
                label="Email"
                variant="outlined"
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
