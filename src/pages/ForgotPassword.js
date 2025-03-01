import { Button, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { forgotRequest } from "../features/user/userSlice";
import pic from "../resources/tweetlogo.png";
import "./Login.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSnackbar } from "notistack";
import { updateForgotUserid } from "../features/user/userSlice";
import { Person } from "@material-ui/icons";
import Call from "@material-ui/icons/Call";

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

const ForgotPassword = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const dispatch = useDispatch();
  const { forgotResponse } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleForgotSubmit = () => {
    const body = { userId, dateOfBirth, mobileNo };
    if (body.userId === "" || body.dateOfBirth === "" || body.mobileNo === "") {
      const variant = "error";
      enqueueSnackbar("Please fill all data!", { variant });
    } else {
      dispatch(updateForgotUserid(userId));
      dispatch(forgotRequest(body));
    }
  };

  useEffect(() => {
    if (forgotResponse === "2") {
      navigate("/updatepassword");
    } else if (forgotResponse === "3") {
      const variant = "error";
      enqueueSnackbar("User Not Found", { variant });
    }
  }, [forgotResponse, enqueueSnackbar, navigate]);

  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item sm={6} xs={12}>
          <img src={pic} alt="" className="logoimage" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div id="loginform">
            <h2 id="headerTitle">Forgot Password</h2>
            <div className={classes.root}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                id="userId"
                type="email"
                label="User ID"
                variant="outlined"
                onChange={(e) => setUserId(e.target.value)}
              />
              <TextField
                id="dobforgot"
                type="date"
                label="Date of Birth"
                variant="outlined"
                onChange={(e) => setDateOfBirth(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Call />
                    </InputAdornment>
                  ),
                }}
                id="mobile"
                type="number"
                label="Mobile Number"
                variant="outlined"
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleForgotSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
