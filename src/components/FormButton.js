import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../features/user/userSlice";
import { useSnackbar } from "notistack";

const FormButton = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginInput, loginsuccess } = useSelector((state) => state.user);
  const  handleClick =  async() => {
    dispatch(loginRequest(loginInput));
  };

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loginsuccess === "2") {
      navigate("/");
    } else if (loginsuccess !== "1") {
      const variant = "error";
      enqueueSnackbar("Invalid username or password!", { variant });
    }
  }, [loginsuccess, enqueueSnackbar, navigate]);

  return (
    <div id="button" className="row">
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};

export default FormButton;
