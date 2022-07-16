import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import pic from '../resources/blank.jpg';

const Home = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <img src={pic} alt='' style={{maxWidth:"100%", maxHeight:"100%"}} />
        </Grid>
        <Grid item xs={6}>
          <Outlet />
        </Grid>
        <Grid item xs={3}>
          <ButtonGroup
            orientation='vertical'
            color='primary'
            aria-label='vertical contained primary button group'
            variant='text'>
            <Link to='/'>
              <Button>All Tweets</Button>
            </Link>
            <Link to='/my_tweets'>
              <Button>My Tweets</Button>
            </Link>
            <Link to='/all_users'>
              <Button>All Users</Button>
            </Link>
            <Link to='/search_users'>
              <Button>Search Users</Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
