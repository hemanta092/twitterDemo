import React, { useState } from 'react';
import './TweetBox.css';
import { Button } from '@material-ui/core';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  const sendTweet = (e) => {
    e.preventDefault();

    setTweetMessage('');
    setTweetImage('');
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
            maxLength='144'
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className='tweetBox__imageInput'
          placeholder='Tags : '
          type='text'
          maxLength='50'

        />

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
