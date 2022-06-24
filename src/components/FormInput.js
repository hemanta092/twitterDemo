import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../features/user/userSlice';

const FormInput = (props) => {
  const dispatch = useDispatch();
  const { loginInput } = useSelector((store) => store.user);
  const inputHandler = (e) => {
    if (props.description === 'Username') {
      const dispatchValue = { ...loginInput, userId: e.target.value };
      dispatch(handleLogin(dispatchValue));
    }
    if (props.description === 'Password') {
      const dispatchValue = { ...loginInput, password: e.target.value };
      dispatch(handleLogin(dispatchValue));
    }
  };
  return (
    <div className='row'>
      <label>{props.description}</label>
      <input
        onChange={inputHandler}
        label={props.description}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormInput;
