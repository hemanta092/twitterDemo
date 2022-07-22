import React from 'react';
import './Login.css';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';
// import { IconButton } from '@material-ui/core';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {
  return (
    <div id='loginform'>
      <h2 id='headerTitle'>Login</h2>
      <div>
        <FormInput
          description='Username'
          placeholder='Enter your username'
          type='text'
        />
        <FormInput
          description='Password'
          placeholder='Enter your password'
          type='password'
        />
        <FormButton title='Log in' />
      </div>
      <div id='alternativeLogin'>
        <Link to='/signup'>SignUp </Link>
        <label>Or sign in with:</label>
        <div id='iconGroup'>
          <IconButton id='facebookIcon'>
            <FacebookIcon></FacebookIcon>
          </IconButton>
          <IconButton id='twitterIcon'>
            <TwitterIcon></TwitterIcon>
          </IconButton>
          <IconButton id='GitHubIcon'>
            <GitHubIcon></GitHubIcon>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
