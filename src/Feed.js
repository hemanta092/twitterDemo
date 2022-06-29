import React from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import './Feed.css';
import FlipMove from 'react-flip-move';
import { useSelector,useDispatch } from 'react-redux';
import Login from './pages/Login';
import { useEffect } from 'react';
import { getTweets } from './features/tweet/tweetSlice';

function Feed() {
  const { isLoggedIn, token } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.tweet);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTweets(token));
  }, [token]);

  return (
    <>
      {isLoggedIn ? (
        <div className='feed'>
          <TweetBox />

          <FlipMove>
          {tweets?.map((post) => (

<Post
 key={post.tweetId}
 displayName={post.createdByName}
 username={post.createdById}
 verified='false'
 text={post.message}
/>
))}
          </FlipMove>
        </div>
      ) : (
        //navigate('/login')
        <Login />
      )}
    </>
  );
}

export default Feed;
