import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/tweet/tweetSlice';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const AllUsers = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.tweet);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [token, dispatch]);

  const classes = useStyles();

  const convertTime = (time) => {
    const theDate = new Date(time).toLocaleString();
    const now = new Date().toLocaleString();
    const diffTime = new Date(now) - new Date(theDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMin = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return diffDays > 0
      ? `${diffDays} Days Ago`
      : diffHours > 0
      ? `${diffHours} Hours Ago`
      : diffMin > 0
      ? `${diffMin} Minutes Ago`
      : `1 Minutes Ago`;
  };

  return (
    <>
      <h1>All Users</h1>
      {allUsers?.map((user) => (
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{user.firstName.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            
            <ListItemText primary={user.userId} secondary={user.firstName+" "+user.lastName} />
            <span>{user.active?'Online' : convertTime(user.lastSeen)}</span>
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default AllUsers;
