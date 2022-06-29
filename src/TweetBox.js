import React, { useState } from 'react';
import './TweetBox.css';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { addTweet } from './features/tweet/tweetSlice';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const { token } = useSelector((state) => state.tweet);

  const dispatch = useDispatch();

  const sendTweet = (e) => {
    e.preventDefault();
    const data = {
      body: {
        message: tweetMessage,
      },
      token,
    };
    dispatch(addTweet(data));
    setTweetMessage('');
  };

  return (
    <div className='tweetBox'>
      <form>
        <div className='tweetBox__input'>
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type='text'
          />
        </div>

        <Button
          onClick={sendTweet}
          type='submit'
          className='tweetBox__tweetButton'>
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
