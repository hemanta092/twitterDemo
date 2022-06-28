import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const getTweetUrl = 'https://tweet-postgress-auth.herokuapp.com/auth/login';

//const getTweetUrl = 'http://localhost:8082/tweet/getAllTweets';
const getTweetUrl = 'http://localhost:8082/tweet/getTweetsByUserNameRegex/Annu';


const initialState = {
  isLoading: false,
  tweets: [],
};

export const getTweets = createAsyncThunk(
  'tweet/getTweets',
  async (reqBody, thunkAPI) => {
    try {
      //   const authToken = reqBody.token;
      const resp = await axios.get(getTweetUrl, {
        headers: {
          Authorization: reqBody,
          //'Access-Control-Allow-Origin': '*',
        },
      });
      return resp.data;
    } catch (error) {
      console.error(error);
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
      console.log('rejected', action);
      state.isLoading = false;
    },
  },
});

export const { handleLogin } = tweetSlice.actions;

export default tweetSlice.reducer;
