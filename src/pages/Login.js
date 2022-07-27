import React from "react";
import "./Login.css";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link } from "react-router-dom";
import pic from "../resources/tweetlogo.png";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";

const Login = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item sm={6} xs={12}>
          <img src={pic} alt="" className="logoimage" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div id="loginform">
            <h2 id="headerTitle">Login</h2>
            <div>
              <FormInput
                description="Username"
                placeholder="Enter your username"
                type="text"
              />
              <FormInput
                description="Password"
                placeholder="Enter your password"
                type="password"
              />
              <FormButton title="Log in" />
            </div>
            <div id="alternativeLogin">
              <Link to="/signup">SignUp </Link>
              <Link to="/forgot">Forgot Password </Link>
              <label>Or sign in with:</label>
              <div id="iconGroup">
                <IconButton id="facebookIcon">
                  <FacebookIcon></FacebookIcon>
                </IconButton>
                <IconButton id="twitterIcon">
                  <TwitterIcon></TwitterIcon>
                </IconButton>
                <IconButton id="GitHubIcon">
                  <GitHubIcon></GitHubIcon>
                </IconButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
