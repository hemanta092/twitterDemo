import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  deleteTweet,
  editTweet,
  likeTweet,
  tweetReply,
} from '../features/tweet/tweetSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

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
    borderBottom: '2px solid black',
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
      let x = JSON.parse(JSON.stringify(t));//Object.assign(x, JSON.parse(JSON.stringify(t)));
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
          {liked ? <FavoriteIcon color='primary' /> : <FavoriteIcon />}
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
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <TextField
            label='Reply'
            variant='outlined'
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button onClick={handleTweetReply}>Post Reply</Button>
          {replies?.map((r) => (
            <div key={r.userId} className={classes.replyBorder}>
              <Typography color='primary'>{r.userId}</Typography>
              <Typography >{r.replyMsg}</Typography>
              <Typography variant="caption" align='right' >{new Date(r.creationTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</Typography>

            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
