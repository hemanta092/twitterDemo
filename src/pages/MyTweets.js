import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TweetCard from '../components/TweetCard';
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
      {myTweets?.map((tweet) => (
        <TweetCard
          key={tweet.id}
          displayName={tweet.createdByName}
          username={tweet.createdById}
          text={tweet.message}
        />
      ))}
    </>
  );
};

export default MyTweets;
