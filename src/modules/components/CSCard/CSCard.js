import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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
  return (
    <Card className={classes.root} key>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.header}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.signature}
        </Typography>
        <Typography variant="body2" component="p">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        {props.buttons.map((item) => (
          <IconButton size="medium" onClick={item.actionOnClick}>
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
