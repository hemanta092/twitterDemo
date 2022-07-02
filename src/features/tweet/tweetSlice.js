import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getTweetUrl = 'http://localhost:8082/tweet/getAllTweets';
const addTweetUrl = 'http://localhost:8082/tweet/addTweet';
const getMyTweetsUrl = 'http://localhost:8082/tweet/getTweetsByUserId';
const getAllUsersUrl = 'http://localhost:8082/tweet/getAllUsers';
const searchUserURL = 'http://localhost:8082/tweet/searchByUserName';

const initialState = {
  isLoading: false,
  tweets: [],
  myTweets: [],
  allUsers: [],
  searchUserResults: [],
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
      const res = await axios.post(addTweetUrl, reqBody.body, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getMyTweets = createAsyncThunk(
  'tweet/getMyTweetsgetMyTweets',
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.get(`${getMyTweetsUrl}/${reqBody.userId}`, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'tweet/getAllUsers',
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.get(getAllUsersUrl, {
        headers: {
          Authorization: reqBody,
        },
      });
      return res;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const searchUserByUsername = createAsyncThunk(
  'tweet/searchUserByUsername',
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.get(`${searchUserURL}/${reqBody.userInput}`, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('something went wrong');
    }
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
      state.isLoading = false;
    },
    [addTweet.fulfilled]: (state, action) => {
      state.tweets = [...state.tweets, action.payload.data];
    },
    [getMyTweets.fulfilled]: (state, action) => {
      state.myTweets = action.payload.data;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.data;
    },
    [searchUserByUsername.fulfilled]: (state, action) => {
      state.searchUserResults = action.payload.data;
    },
  },
});

export const { handleLogin } = tweetSlice.actions;

export default tweetSlice.reducer;
