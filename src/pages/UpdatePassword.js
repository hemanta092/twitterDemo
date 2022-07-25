import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { updatePasswrod } from '../features/user/userSlice';
import pic from '../resources/tweetlogo.png';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const { forgotUserid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleUpdatePassword = () => {
    if (password === rePassword) {
      const variant = 'success';
      const body = {
        userId: forgotUserid,
        newPassword: password,
      };
      dispatch(updatePasswrod(body));
      enqueueSnackbar('Passwords updated successfully', { variant });
      navigate('/login');
    } else {
      const variant = 'error';
      enqueueSnackbar('Passwords do not match!', { variant });
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
                id='password'
                type='password'
                label='Password'
                variant='outlined'
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id='newPassword'
                type='password'
                label='Retype Password'
                variant='outlined'
                onChange={(e) => setRePassword(e.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleUpdatePassword}>
                Update Password
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdatePassword;
