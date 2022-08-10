import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/tweet/tweetSlice";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  boxShadow: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  statusOnline: {
    color: "green",
    fontWeight: "bold",
  },
  statusOffline: {
    color: "red",
    fontWeight: "bold",
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
    <>
      <h1 style={{ textAlign: "center" }}>All Users</h1>
      {allUsers?.map((user) => (
        <List className={classes.root} key={user.userId}>
          <ListItem
            className={classes.boxShadow}
            style={{ wordBreak: "break-word" }}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor:
                    colors[
                      user.firstName.charAt(0).toUpperCase().charCodeAt(0) -
                        "A".charCodeAt(0)
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
            {user.active ? (
              <span className={classes.statusOnline}>
                <div className="d-none d-sm-block">Online</div>
                <div className="d-sm-none d-xs-block">
                  {" "}
                  <FiberManualRecordIcon />
                </div>
              </span>
            ) : (
              <span className={classes.statusOffline}>
                <div className="d-none d-sm-block">
                  {convertTime(user.lastSeen)}
                </div>
                <div className="d-sm-none d-xs-block">
                  {" "}
                  <FiberManualRecordIcon />
                </div>
              </span>
            )}
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default AllUsers;
