import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const Home = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={6}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Outlet />
        </Grid>
        <Grid item xs={3}>
          <ButtonGroup
            orientation='vertical'
            color='primary'
            aria-label='vertical contained primary button group'
            variant='text'>
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
