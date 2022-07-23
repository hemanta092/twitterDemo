import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '2rem',
    width: '100%',
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  flexSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#33B5FF',
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.flexSpaceBetween}>
          <TwitterIcon />
          <h2>Tweet App</h2>
          <div>
            {isLoggedIn ? null : <Link to='/signup' className = {classes.menuButton}><Button variant='outlined'>Sign Up</Button></Link>}
            <Link to='/login'>
              {isLoggedIn ? (
                <Button variant='outlined'>Sign Out</Button>
              ) : (
                <Button variant='outlined'>Login</Button>
              )}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
