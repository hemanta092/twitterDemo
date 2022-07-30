import {
  Avatar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@material-ui/core";
import "./SearchUser.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserByUsername } from "../features/tweet/tweetSlice";

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

const SearchUser = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { searchUserResults } = useSelector((state) => state.tweet);

  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (userInput.length > 0) {
      dispatch(searchUserByUsername({ userInput, token }));
    }
  }, [token, userInput, dispatch]);

  const searchUserInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  var colors = [
    "aqua",
    "blanchedalmond",
    "blue",
    "fuchsia",
    "gold",
    "green",
    "lime",
    "coral",
    "navy",
    "olive",
    "orange",
    "mediumpurple",
    "orangered",
    "silver",
    "teal",
    "deepskyblue",
    "yellow",
    "lightsalmon",
    "palegreen",
    "pink",
    "plum",
    "tomato",
    "violet",
    "olivedrab",
    "moccasin",
    "lawngreen",
  ];

  return (
    <Container>
      <h1 className="searchuser">Search User</h1>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={9}>
          <TextField
            label="Search User"
            variant="outlined"
            size="small"
            
            onChange={searchUserInputHandler}
            style={{ width: "96%" }}
          />
        </Grid>
        <Grid item xs>
          <Button size="medium" variant="contained" style={{ width: "100%" }}  color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
      
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {searchUserResults === undefined || searchUserResults.length === 0 ? (
          <h2 className="noUser"> No User Found</h2>
        ) : (
          searchUserResults.map((user) => (
            <Grid item md key={user.userId}>
              <List>
                <ListItem className="listItem">
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        backgroundColor:
                          colors[
                            user.firstName
                              .charAt(0)
                              .toUpperCase()
                              .charCodeAt(0) - "A".charCodeAt(0)
                          ],
                      }}
                    >
                      {user.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.userId}
                    secondary={user.firstName + " " + user.lastName}
                  />
                  <span
                    className={"status" + (user.active ? "Online" : "Offline")}
                  >
                    {user.active ? "Online" : convertTime(user.lastSeen)}
                  </span>
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
