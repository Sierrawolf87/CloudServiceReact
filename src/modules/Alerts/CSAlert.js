import React from 'react';
import { Snackbar, withStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const styles = () => ({
  csAlert: {
    maxWidth: '80vw',
  },
});
class CSAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertOpen: true,
    };
    this.oldText = '';
  }

  shouldComponentUpdate() {
    if (!this.state.alertOpen && this.props.text !== this.oldText) {
      this.oldText = this.props.text;
      this.setState({
        alertOpen: true,
      });
    }
    return true;
  }

  render() {
    const { classes } = this.props;
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
        alertOpen: false,
      });
    };

    return (
      <Snackbar
        className={classes.csAlert}
        open={(Boolean)(this.state.alertOpen && this.props.text)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={this.props.variant} onClose={handleClose}>
          {this.props.text}
        </Alert>
      </Snackbar>
    );
  }
}

export default withStyles(styles)(CSAlert);
