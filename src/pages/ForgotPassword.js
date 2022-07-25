import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { forgotRequest } from '../features/user/userSlice';
import pic from '../resources/tweetlogo.png';
import './Login.css';
import { useSnackbar } from 'notistack';
import { updateForgotUserid } from '../features/user/userSlice';

const ForgotPassword = () => {
  const [userId, setUserId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const dispatch = useDispatch();
  const { forgotResponse } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleForgotSubmit = () => {
    const body = { userId, dateOfBirth, mobileNo };
    dispatch(updateForgotUserid(userId));
    dispatch(forgotRequest(body));
    if (forgotResponse) {
      navigate('/updatepassword');
    } else {
      const variant = 'warning';
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
            <div>
              <TextField
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
