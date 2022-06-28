import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loginurl = 'https://tweet-postgress-auth.herokuapp.com/auth/login';
const getUserUrl = 'https://tweet-postgress-auth.herokuapp.com/auth/validate';

const initialState = {
  user: [],
  isLoggedIn: true,
  isLoading: false,
  userId: '',
  token: '',
  loginInput: {
    userId: '',
    password: '',
  },
};

export const loginRequest = createAsyncThunk(
  'user/loginRequest',
  async (reqBody, thunkAPI) => {
    try {
      const jsonBody = JSON.stringify(reqBody);
      const resp = await axios.post(loginurl, jsonBody, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (reqBody, thunkAPI) => {
    let headers = {
      Authorization: `Bearer ${reqBody}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Controll-Allow-Methods': '*',
    };
    try {
      const resp = await axios.get(getUserUrl, { headers });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      const details = action.payload;
      state.loginInput = details;
    },
  },
  extraReducers: {
    [loginRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [loginRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.token = `Bearer ${action.payload.authToken}`;
    },
    [loginRequest.rejected]: (state, action) => {
      console.log('rejected', action);
      state.isLoading = false;
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
  },
});

export const { handleLogin } = userSlice.actions;

export default userSlice.reducer;
