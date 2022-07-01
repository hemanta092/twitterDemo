import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/tweet/tweetSlice';

const SearchUser = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.tweet);

  const [userInput, setUserInput] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(
      allUsers.find((x) => x.userId === userInput || x.firstName === userInput)
    );
  }, [userInput, allUsers]);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [token, dispatch]);

  const searchUserInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <>
      <TextField
        label='Search User'
        variant='outlined'
        onChange={searchUserInputHandler}
      />
      <Button variant='contained' color='primary'>
        Search
      </Button>
      <Divider />
      {user?.map((u) => (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>R</Avatar>
            </ListItemAvatar>
            <ListItemText primary={u.Id} secondary='Jan 9, 2014' />
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default SearchUser;
