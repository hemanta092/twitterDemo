import React, { useRef, useState } from 'react';
import './Login.css';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { form, setForm } = useState({});

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const mobileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setForm({
      userId: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      dateOfBirth: dobRef.current.value,
      gender: genderRef.current.value,
      mobileNo: genderRef.current.value,
    });
    dispatch(
      signupRequest({
        body: form,
      })
    );
    navigate('/login');
  };

  return (
    <div id='loginform'>
      <h2 id='headerTitle'>Sign Up</h2>
      <form
        className={classes.root}
        onSubmit={handleFormSubmit}
        noValidate
        autoComplete='off'>
        <TextField
          inputRef={firstNameRef}
          id='firstname'
          label='First Name'
          variant='outlined'
        />
        <TextField id='lastname' label='Last Name' variant='outlined' />
        <TextField
          id='password'
          label='Password'
          type='password'
          variant='outlined'
        />
        <TextField
          id='dob'
          label='Date of Birth'
          type='date'
          variant='outlined'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id='gender' label='Gender' variant='outlined' />
        <TextField
          inputRef={mobileRef}
          id='mobile'
          label='Mobile Number'
          variant='outlined'
        />
        <TextField id='email' type='email' label='Email' variant='outlined' />
        <Button type='submit' variant='contained' color='primary'>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
