import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import {ListItem,ListItemText,Typography,IconButton,Card} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@mui/material/Divider';
import {
  deleteTweet,
  editTweet,
  likeTweet,
  tweetReply,
} from '../features/tweet/tweetSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MyTweets from '../pages/MyTweets';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  replyBorder: {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  replydiv:{
    marginBottom : '25px',
  },
  replyfield:{
    width: '78%',
    height: '50px',
    marginRight : '2%',
  },
  replybutton:{
    height: '55px',
    width : '20%',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [reply, setReply] = React.useState('');
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [editedTweetText, setEditedTweetText] = React.useState(text);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const { token } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();
  //const theDate = new Date(time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
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
    setReply('');
  };

  const handleTweetReply = () => {
    dispatch(
      tweetReply({
        tweetId: id,
        body: {
          replyMsg: reply,
        },
        token,
      })
    );
    setReply('');
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
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
    <div style={modalStyle} className={classes.paper}>
      <h2 id='edit-tweet-modal'>Edit Tweet</h2>

      <TextField
        label='Reply'
        variant='outlined'
        value={editedTweetText}
        onChange={(e) => setEditedTweetText(e.target.value)}
      />
      <Button onClick={handleEditTweet}>Submit</Button>
    </div>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        title={displayName}
        subheader={username}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='edit-tweet'
        aria-describedby='edit-tweet-description'>
        {body}
      </Modal>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='Like Tweet' onClick={handleLikeTweet}>
          {liked ? <FavoriteIcon color='secondary' /> : <FavoriteIcon />}
          <p>{likeCount}</p>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
        {myTweet ? (
          <div>
            <IconButton aria-label='Edit Tweet' onClick={handleOpen}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='Delete Tweet' onClick={handleDeleteTweet}>
              <DeleteIcon />
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity='error'>
                  Tweet Deleted!
                </Alert>
              </Snackbar>
            </IconButton>
          </div>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <div className={classes.replydiv}>
          <TextField
            className= {classes.replyfield}
            label='Reply'
            variant='outlined'
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button className= {classes.replybutton} variant="contained" color='primary' onClick={handleTweetReply}>Post Reply</Button>
          </div>
          {replies?.map((r) => (
            <div key={r.userId} >
              <ListItem className = {classes.replyBorder}>
              <ListItemText secondary={r.userId} primary = {r.replyMsg}/>
              <span>
                {new Date(r.creationTime).toLocaleString(undefined, {
                  timeZone: 'Asia/Kolkata',
                })}
              </span>
              </ListItem>
            </div>
          ))}
        </CardContent>
      </Collapse>
      <Divider light/>
    </Card>
    
  );
}
