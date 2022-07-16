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
import { likeTweet, tweetReply } from '../features/tweet/tweetSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

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

  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <TextField
            label='Reply'
            variant='outlined'
            onChange={(e) => setReply(e.target.value)}
          />
          <Button onClick={handleTweetReply}>Post Reply</Button>
          {replies?.map((r) => (
            <div key = {r.userId} className={classes.replyBorder}>
              <Typography>{r.userId}</Typography>
              <Typography paragraph>{r.replyMsg}</Typography>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
