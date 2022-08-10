import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { ListItemText, Typography, IconButton, Card } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import {
  deleteTweet,
  editTweet,
  likeTweet,
  tweetReply,
} from "../features/tweet/tweetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useSnackbar } from "notistack";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  replyBorder: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  replydiv: {
    marginBottom: "25px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  isActive: {
    transitionDuration: "1s",
    backgroundPosition: "-2800px 0",
  },
  heart: {
    cursor: "pointer",
    transition: "background-position 1s steps(28)",
  },
}));

export default function TweetCard({
  id,
  displayName,
  username,
  text,
  liked,
  likeCount,
  replies,
  myTweet,
  tag,
  createdTime,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [reply, setReply] = React.useState("");
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [editedTweetText, setEditedTweetText] = React.useState(text);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const { token } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeTweet = () => {
    dispatch(
      likeTweet({
        tweetId: id,
        token,
      })
    );
    setReply("");
  };

  const handleTweetReply = () => {
    if (reply.length !== 0) {
      dispatch(
        tweetReply({
          tweetId: id,
          body: {
            replyMsg: reply,
          },
          token,
        })
      );
      setReply("");
    } else {
      const variant = "error";
      enqueueSnackbar("Please enter tweet reply!", { variant });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleEditTweet = () => {
    let t = tweets.find((item) => item.tweetId === id);
    console.log(t);
    if (t) {
      let x = JSON.parse(JSON.stringify(t));
      x.message = editedTweetText;
      console.log(t);
      dispatch(
        editTweet({
          body: x,
          token,
        })
      );
    }
    setOpen(false);
  };

  const handleDeleteTweet = () => {
    dispatch(
      deleteTweet({
        tweetId: id,
        token,
      })
    );
    setSnackbarOpen(true);
  };

  const body = (
    // <div style={modalStyle} className={classes.paper}>
    //   <h2 id="edit-tweet-modal">Edit Tweet</h2>

    //   <TextField
    //     label="Reply"
    //     variant="outlined"
    //     value={editedTweetText}
    //     onChange={(e) => setEditedTweetText(e.target.value)}
    //   />
    //   <Button onClick={handleEditTweet}>Submit</Button>
    // </div>
    <div className="modal modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Tweet</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editedTweetText}
                onChange={(e) => setEditedTweetText(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEditTweet}
          >
            Edit Message
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            style={{
              backgroundColor:
                colors[
                  displayName.charAt(0).toUpperCase().charCodeAt(0) -
                    "A".charCodeAt(0)
                ],
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={displayName}
        subheader={username}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-tweet"
        aria-describedby="edit-tweet-description"
      >
        {body}
      </Modal>

      <CardContent style={{ wordBreak: "break-word", padding: "10px 15px" }}>
        <Typography variant="body1" color="textSecondary" component="p">
          {text}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {tag}
        </Typography>
        <Typography component="div">
          <p className="card-text text-end">
            <small className="text-muted text-black-50">
              {new Date(createdTime).toLocaleString(undefined, {
                timeZone: "Asia/Kolkata",
              })}
            </small>
          </p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="px-0 py-0">
        <IconButton aria-label="Like Tweet" onClick={handleLikeTweet}>
          {liked ? <FavoriteIcon color="secondary" /> : <FavoriteIcon />}
          <div style={{ fontSize: ".5em", color: "#6c757d" }}>
            <span>{likeCount}</span>
          </div>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        {myTweet ? (
          <div className="d-flex">
            <IconButton aria-label="Edit Tweet" onClick={handleOpen}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete Tweet" onClick={handleDeleteTweet}>
              <DeleteIcon />
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
              >
                <Alert onClose={handleSnackbarClose} severity="error">
                  Tweet Deleted!
                </Alert>
              </Snackbar>
            </IconButton>
          </div>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.replydiv}>
            <TextField
              label="Reply"
              variant="outlined"
              style={{ width: "100%" }}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTweetReply}
                    style={{ height: "100%" }}
                  >
                    Reply
                  </Button>
                ),
              }}
            />
          </div>
          {replies?.map((r) => (
            <div key={r.tweetreplyId}>
              <div
                className={`px-2 ${classes.replyBorder}`}
                style={{ wordBreak: "break-word" }}
              >
                <ListItemText
                  component="p"
                  secondary={r.userId}
                  primary={r.replyMsg}
                />
                <div
                  style={{
                    fontSize: ".75em",
                    color: "#6c757d",
                    textAlign: "right",
                  }}
                >
                  <span>
                    {new Date(r.creationTime).toLocaleString(undefined, {
                      timeZone: "Asia/Kolkata",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Collapse>
      <Divider light />
    </Card>
  );
}
