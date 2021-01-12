import {
  Box,
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

const styles = () => ({
  dialogBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class UserEdit extends React.Component {
  cancel() {
    const { enqueueSnackbar } = this.props;
    this.props.close('userEditOpen');
    enqueueSnackbar('Изменения не сохранены', { variant: 'info' });
  }

  renderDialogBody() {
    const { classes } = this.props;
    const { userById, userByIdLoading } = this.props.userList;
    if (userByIdLoading) {
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
          <TextField value={userById.id} />
          <TextField value={userById.userName} label="Логин" />
          <TextField value={userById.initials} label="Инициалы" />
          <TextField value={userById.surname} label="Фамилия" />
          <TextField value={userById.name} label="Имя" />
          <TextField value={userById.patronymic} label="Отчество" />
          <TextField value={userById.reportCard} label="Студенческий" />
          <Autocomplete
            className={classes.roleSelect}
            id="roleFilter"
            autoHighlight
            options={this.props.userList.userRoleData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Роль" />}
            onChange={() => {

            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.cancel()} color="primary">
            Отмена
          </Button>
          <Button onClick={() => this.props.handleClose('userEditOpen')} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Box>
    );
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Dialog open={isOpen} onClose={() => this.cancel()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Редактирование</DialogTitle>
        {this.renderDialogBody()}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
});

/* const mapDispatchToProps = () => (dispatch) => ({
  putChanges: () => dispatch(putChanges()),
}); */

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  null,
)(UserEdit)));
