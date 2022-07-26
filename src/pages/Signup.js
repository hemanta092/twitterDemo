import React, { useState } from 'react';
import './Login.css';
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import pic from '../resources/tweetlogo.png';
import { useSnackbar } from 'notistack';

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
  //const [form, setForm ] = useState({});

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  // const firstNameRef = useRef(null);
  // const lastNameRef = useRef(null);
  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);
  // const genderRef = useRef(null);
  // const dobRef = useRef(null);
  // const mobileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = {
      userId,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNo,
    };
    dispatch(
      signupRequest({
        body: form,
      })
    );
    const variant = 'success';
    enqueueSnackbar('Signed Up Successfully!', { variant });
    navigate('/login');
    // setForm({
    //   userId: emailRef.current.value,
    //   password: passwordRef.current.value,
    //   firstName: firstNameRef.current.value,
    //   lastName: lastNameRef.current.value,
    //   dateOfBirth: dobRef.current.value,
    //   gender: genderRef.current.value,
    //   mobileNo: mobileRef.current.value,

    // });
  };

  // useEffect(()=>{
  //   dispatch(
  //     signupRequest({
  //       body: form,
  //     })
  //   );
  //   //navigate('/login');
  // },[form,dispatch]);

  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item sm={6} xs={12}>
          <img src={pic} alt='' className='logoimage' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div id='loginform'>
            <h2 id='headerTitle'>Sign Up</h2>
            <form
              className={classes.root}
              onSubmit={handleFormSubmit}
              noValidate
              autoComplete='off'>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                id='firstname'
                label='First Name'
                variant='outlined'
                required
              />
              <TextField
                id='lastname'
                onChange={(e) => setLastName(e.target.value)}
                label='Last Name'
                variant='outlined'
                required
              />
              <TextField
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                label='Password'
                type='password'
                variant='outlined'
                required
              />
              <TextField
                id='dob'
                onChange={(e) => setDateOfBirth(e.target.value)}
                label='Date of Birth'
                type='date'
                variant='outlined'
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id='gender'
                onChange={(e) => setGender(e.target.value)}
                label='Gender'
                variant='outlined'
                required
              />
              <TextField
                onChange={(e) => setMobileNo(e.target.value)}
                id='mobile'
                label='Mobile Number'
                variant='outlined'
                required
              />
              <TextField
                id='email'
                onChange={(e) => setUserId(e.target.value)}
                type='email'
                label='Email'
                variant='outlined'
                required
              />
              <Button type='submit' variant='contained' color='primary'>
                Sign Up
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
