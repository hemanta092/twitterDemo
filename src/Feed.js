import React from 'react';
import TweetBox from './TweetBox';
import './Feed.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTweets } from './features/tweet/tweetSlice';
import { useNavigate } from 'react-router-dom';
import { Divider, Grid } from '@material-ui/core';
import TweetCard from './components/TweetCard';

function Feed() {
  const { isLoggedIn, token } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTweets(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className='feed'>
        <TweetBox />
        <Divider />
        <Grid
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='stretch'>
          {tweets?.map((post) => (
            <Grid item md key={post.id}>
              <TweetCard
                displayName={post.createdByName}
                username={post.createdById}
                text={post.message}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Feed;
