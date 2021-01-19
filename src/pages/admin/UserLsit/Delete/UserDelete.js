import {
  Box,
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, withStyles,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { deleteUser } from '../UserListSlice';

const styles = () => ({
  dialogBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    width: '200px',
    marginBottom: '10px',
  },
});

class UserDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInState: false,
      loading: true,
    };
  }

  componentDidUpdate() {
    this.onOpen();
  }

  // За это немного стыдно
  // Метод заносит новые данные, полученные из redux
  // в state компонента, чтобы мы могли их изменять.
  onOpen() {
    const { isOpen } = this.props;
    if (isOpen) {
      const { userById, userByIdLoading } = this.props.userList;
      if (!userByIdLoading && !this.state.dataInState) {
        this.setState({
          dataInState: true,
          loading: false,
          data: {
            id: userById.id,
            userName: userById.userName,
          },
        });
      }
    }
  }

  cancel() {
    this.props.close('userDeleteOpen');
    this.setState({
      dataInState: false,
      loading: true,
    });
  }

  delete() {
    this.props.deleteUser(this.state.data.id);
    this.props.close('userDeleteOpen');
    this.setState({
      dataInState: false,
      loading: true,
    });
  }

  renderDialogBody() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <Box>
          <Box width="100%" height="150px" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
          <DialogActions>
            <Button onClick={() => this.cancel()} color="primary">
              Отмена
            </Button>
          </DialogActions>
        </Box>
      );
    }

    return (
      <Box>
        <DialogContent className={classes.dialogBody}>
          {`Вы действительно хотите удалить пользователя "${this.state.data.userName}"?`}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.cancel()} color="primary">
            Отмена
          </Button>
          <Button onClick={() => this.delete()} color="secondary">
            Удалить
          </Button>
        </DialogActions>
      </Box>
    );
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Dialog open={isOpen} onClose={() => this.cancel()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Удаление</DialogTitle>
        {this.renderDialogBody()}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
});

const mapDispatchToProps = () => (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
});

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDelete)));
