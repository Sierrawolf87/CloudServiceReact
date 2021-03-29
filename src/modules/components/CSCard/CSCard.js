import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import StyledLink from '../StyledLink/StyledLink';

const useStyles = makeStyles({
  root: {
    width: '300px',
    height: 'max-content',
    margin: '16px',
    whiteSpace: 'pre-wrap',
  },
  title: {
    fontSize: '14px',
  },
  pos: {
    marginBottom: '12px',
  },
});

export function CSCard(props) {
  const classes = useStyles();
  const buttons = props.buttons || [];
  if (!props.link) {
    return (
      <Card className={`${classes.root} ${[props.className]}`} key={props.key} onClick={props.onClick}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {props.header}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.pos}>
            {props.signature}
          </Typography>
          <Typography variant="body2" component="p">
            {props.body}
          </Typography>
        </CardContent>
        <CardActions>
          {buttons.map((item) => (
            <IconButton key={new Date().getTime() + Math.random()} size="medium" onClick={() => { item.actionOnClick(props.id); }}>
              {item.icon}
            </IconButton>
          ))}
        </CardActions>
      </Card>
    );
  }
  return (
    <Card className={`${classes.root} ${[props.className]}`} key={props.key} onClick={props.onClick}>
      <StyledLink to={props.link}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {props.header}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.pos}>
            {props.signature}
          </Typography>
          <Typography variant="body2" component="p">
            {props.body}
          </Typography>
        </CardContent>
      </StyledLink>
      <CardActions>
        {buttons.map((item) => (
          <IconButton key={new Date().getTime() + Math.random()} size="medium" onClick={() => { item.actionOnClick(props.id); }}>
            {item.icon}
          </IconButton>
        ))}
      </CardActions>
    </Card>
  );
}

export function CSCardSkeleton() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography variant="h5" component="h2">
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography variant="body2" component="p">
          <Skeleton variant="text" animation="wave" />
        </Typography>
      </div>
      <CardActions>
        <Skeleton width="30px" height="30px" variant="circle" animation="wave" />
        <Skeleton width="30px" height="30px" variant="circle" animation="wave" />
        <Skeleton width="30px" height="30px" variant="circle" animation="wave" />
        <Skeleton width="30px" height="30px" variant="circle" animation="wave" />
      </CardActions>
    </Box>
  );
}
