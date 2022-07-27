import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import pic from "../resources/blank.jpg";
import { useSelector } from "react-redux";
import "./SharedLayout.css";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <img src={pic} alt="" className="profileimage" />
          <h1 style={{ textAlign: "center" }}>{user.name}</h1>
        </Grid>
        <Grid item xs={6}>
          <Outlet />
        </Grid>
        <Grid item xs={3}>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
            className="buttonGroup"
          >
            <Link to="/" className="linkTo">
              <Button className="mainButton">All Tweets</Button>
            </Link>
            <Link to="/my_tweets" className="linkTo">
              <Button className="mainButton">My Tweets</Button>
            </Link>
            <Link to="/all_users" className="linkTo">
              <Button className="mainButton">All Users</Button>
            </Link>
            <Link to="/search_users" className="linkTo">
              <Button className="mainButton">Search Users</Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
