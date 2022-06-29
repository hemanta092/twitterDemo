import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getTweetUrl = 'https://tweet-postgress-auth.herokuapp.com/auth/login';
const addTweetUrl = '';

const initialState = {
  isLoading: false,
  tweets: [],
};

export const getTweets = createAsyncThunk(
  'tweet/getTweets',
  async (reqBody, thunkAPI) => {
    try {
      //   const authToken = reqBody.token;
      console.log('calling tweet api');
      const resp = await axios.get(getTweetUrl, {
        headers: {
          Authorization: reqBody,
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

export const addTweet = createAsyncThunk(
  'tweet/addTweet',
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.post(addTweetUrl, JSON.stringify(reqBody.body), {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res;
    } catch (err) {}
  }
);

const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    getTweetsData: (state, action) => {
      const details = action.payload;
      state.loginInput = details;
    },
  },
  extraReducers: {
    [getTweets.pending]: (state) => {
      state.isLoading = true;
    },
    [getTweets.fulfilled]: (state, action) => {
      state.tweets = action.payload;
    },
    [getTweets.rejected]: (state, action) => {
      console.log('rejected', action);
      state.isLoading = false;
    },
  },
});

export const { handleLogin } = tweetSlice.actions;

export default tweetSlice.reducer;
