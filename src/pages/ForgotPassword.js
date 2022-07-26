import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { forgotRequest } from '../features/user/userSlice';
import pic from '../resources/tweetlogo.png';
import './Login.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useSnackbar } from 'notistack';
import { updateForgotUserid } from '../features/user/userSlice';
import { Person } from '@material-ui/icons';
import Call from '@material-ui/icons/Call';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const dispatch = useDispatch();
  const { forgotResponse } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleForgotSubmit = async () => {
    const body = { userId, dateOfBirth, mobileNo };
    await dispatch(updateForgotUserid(userId));
    await dispatch(forgotRequest(body));
    if (forgotResponse) {
      navigate('/updatepassword');
    } else {
      const variant = 'error';
      enqueueSnackbar('User Not Found', { variant });
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item sm={6} xs={12}>
          <img src={pic} alt='' className='logoimage' />
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <div id='loginform'>
            <h2 id='headerTitle'>Forgot Password</h2>
            <div className = {classes.root}>
              <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Person />
                  </InputAdornment>
                ),
              }}
                id='userId'
                type='email'
                label='User ID'
                variant='outlined'
                onChange={(e) => setUserId(e.target.value)}
              />
              <TextField
                id='dobforgot'
                type='date'
                label='Date of Birth'
                variant='outlined'
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
                id='mobile'
                type='number'
                label='Monile Number'
                variant='outlined'
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleForgotSubmit}>
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
