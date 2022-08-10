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
      <div className="container-fluid">
      <Grid container spacing={0} className="row mx-0 px-0">
        <Grid item className="col col-md-3 d-none d-md-block mx-0 px-0">
          <img src={pic} alt="" className="profileimage" />
          <h1 style={{ textAlign: "center" }}>{user.name}</h1>
        </Grid>
        <Grid item className="col col-xs-12 pr-xs-0 col-md-9 col-lg-6 mx-0 px-0 justify-content-center">
          <Outlet />
        </Grid>
        
        <Grid item  className="col col-lg-3 d-none d-lg-block mx-0 px-3" >
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
      </div>
    </>
  );
};
export default Home;
