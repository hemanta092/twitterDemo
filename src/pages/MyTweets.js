import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TweetCard from '../components/TweetCard';
import { Grid } from '@material-ui/core';
import { getMyTweets } from '../features/tweet/tweetSlice';

const MyTweets = () => {
  const dispatch = useDispatch();
  const { myTweets } = useSelector((state) => state.tweet);
  const { token, userId } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyTweets({ token, userId }));
  }, [token, userId, dispatch]);
  return (
    <>
      <h1>My Tweets</h1>
      <Grid
        container
        direction='column'
        justifyContent='space-evenly'
        alignItems='stretch'>
        {myTweets?.map((tweet) => (
          <Grid item md key={tweet.id}>
            <TweetCard
              displayName={tweet.createdByName}
              username={tweet.createdById}
              text={tweet.message}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyTweets;
