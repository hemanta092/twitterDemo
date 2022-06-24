import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../features/user/userSlice';

const FormButton = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginInput } = useSelector((state) => state.user);
  const handleClick = async () => {
    await dispatch(loginRequest(loginInput));
    navigate('/');
  };
  return (
    <div id='button' className='row'>
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};

export default FormButton;
