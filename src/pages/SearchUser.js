import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserByUsername } from '../features/tweet/tweetSlice';

const SearchUser = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { searchUserResults } = useSelector((state) => state.tweet);

  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (userInput.length >= 3) {
      dispatch(searchUserByUsername({ userInput, token }));
    }
  }, [token, userInput, dispatch]);

  const searchUserInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Container maxWidth='sm'>
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'>
        <Grid item xs={9}>
          <TextField
            label='Search User'
            variant='outlined'
            size='small'
            fullWidth
            onChange={searchUserInputHandler}
          />
        </Grid>
        <Grid item xs>
          <Button size='medium' variant='contained' fullWidth color='primary'>
            Search
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction='column'
        justifyContent='space-evenly'
        alignItems='stretch'>
        {searchUserResults === undefined || searchUserResults.length === 0 ? (
          <h2>Search Users</h2>
        ) : (
          searchUserResults.map((user) => (
            <Grid item md>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{user.firstName.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.userId}
                    secondary={user.firstName}
                  />
                </ListItem>
              </List>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default SearchUser;
