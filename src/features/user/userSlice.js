import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const refURLT = "http://65.2.29.179:8082/tweet/";
//const refURLA = "http://15.206.166.97:8081/auth/";
const refURLT = "http://localhost:8082/tweet/";
const refURLA = "http://localhost:8081/auth/";

const loginurl = refURLA + "login";
const getUserUrl = refURLA + "validate";
const signupURL = refURLA + "register";
const signoutURL = refURLT + "logout";
const forgotURL = refURLA + "forget";
const updatePasswordURL = refURLA + "updatePassword";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  userId: "",
  token: "",
  loginInput: {
    userId: "",
    password: "",
  },
  forgotResponse: "1",
  signupResponse: "1",
  forgotUserid: "",
  loginsuccess: "1",
};

const defaultState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  userId: "",
  token: "",
  loginInput: {
    userId: "",
    password: "",
  },
  forgotResponse: "1",
  signupResponse: "1",
  forgotUserid: "",
  loginsuccess: "1",
};

export const loginRequest = createAsyncThunk(
  "user/loginRequest",
  async (reqBody, thunkAPI) => {
    try {
      const jsonBody = JSON.stringify(reqBody);
      const resp = await axios.post(loginurl, jsonBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (reqBody, thunkAPI) => {
    let headers = {
      Authorization: reqBody,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Controll-Allow-Methods": "*",
    };
    try {
      const resp = await axios.get(getUserUrl, { headers });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const signupRequest = createAsyncThunk(
  "user/signupRequest",
  async (reqBody) => {
    console.log(reqBody);
    try {
      const res = await axios.post(signupURL, reqBody.body);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const signoutRequest = createAsyncThunk(
  "user/signout",
  async (reqBody) => {
    try {
      const res = await axios.get(signoutURL, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const forgotRequest = createAsyncThunk(
  "user/forgotRequest",
  async (reqBody) => {
    try {
      const res = await axios.post(forgotURL, reqBody);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updatePasswrod = createAsyncThunk(
  "user/updatePassword",
  async (reqBody) => {
    try {
      const res = await axios.post(updatePasswordURL, reqBody);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      const details = action.payload;
      state.loginInput = details;
    },
    updateForgotUserid: (state, action) => {
      state.forgotUserid = action.payload;
    },
  },
  extraReducers: {
    [loginRequest.pending]: (state) => {
      state.isLoading = true;
    },

    [loginRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.loginsuccess = "2";
      state.userId = action.payload.userId;
      state.user.name = action.payload.userName;
      state.token = `Bearer ${action.payload.authToken}`;
    },
    [loginRequest.rejected]: (state, action) => {
      
      state.isLoading = false;
      state.loginsuccess = (Math.random() + 1).toString(36).substring(7);
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
    [getUser.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
    [signoutRequest.fulfilled]: (state) => {
      Object.assign(state, defaultState);
    },
    [forgotRequest.fulfilled]: (state, action) => {
      action.payload.valid === true
        ? (state.forgotResponse = "2")
        : (state.forgotResponse = "3");
    },
    [signupRequest.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload !== undefined && action.payload.valid === true) {
        state.signupResponse = "2";
      } else {
        state.signupResponse = "3";
      }
    },
    [updatePasswrod.fulfilled]: (state, action) => {},
  },
});

export const { handleLogin, updateForgotUserid } = userSlice.actions;

export default userSlice.reducer;
