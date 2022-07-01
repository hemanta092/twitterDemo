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

  return (
    <>
      {allUsers?.map((user) => (
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>R</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.Id} secondary='Jan 9, 2014' />
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default AllUsers;
