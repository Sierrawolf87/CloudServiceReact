import {
  Box,
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { putChanges } from '../UserListSlice';
import { ShowNotification } from '../../../../modules/Alert/AlertSlice';

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

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInState: false,
      loading: true,
      data: {
        id: '',
        userName: '',
        surname: '',
        name: '',
        patronymic: '',
        reportCard: '',
        email: '',
      },
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
            surname: userById.surname,
            name: userById.name,
            patronymic: userById.patronymic,
            reportCard: userById.reportCard,
            email: userById.email,
            role: {
              id: userById.role.id,
            },
            group: {
              id: userById.group.id,
            },
          },
        });
      }
    }
  }

  onChangeFields(e) {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value,
      },
    }));
  }

  cancel() {
    this.props.close('userEditOpen');
    this.props.showNotification('Изменения не сохранены', 'info');
    this.setState({
      dataInState: false,
      loading: true,
    });
  }

  save() {
    this.props.putChanges(this.state.data);
    this.props.close('userEditOpen');
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

    const defaultRole = this.props.userList.userRoleData.filter((item) => item.id === this.state.data.role.id)[0];
    const defaultGroup = this.props.userList.userGroupData.filter((item) => item.id === this.state.data.group.id)[0];

    return (
      <Box>
        <DialogContent className={classes.dialogBody}>
          <TextField className={classes.field} value={this.state.data.userName || ''} onChange={(e) => this.onChangeFields(e)} name="userName" label="Имя пользователя" />
          <TextField className={classes.field} value={this.state.data.surname || ''} onChange={(e) => this.onChangeFields(e)} name="surname" label="Фамилия" />
          <TextField className={classes.field} value={this.state.data.name || ''} onChange={(e) => this.onChangeFields(e)} name="name" label="Имя" />
          <TextField className={classes.field} value={this.state.data.patronymic || ''} onChange={(e) => this.onChangeFields(e)} name="patronymic" label="Отчество" />
          <TextField className={classes.field} value={this.state.data.reportCard || ''} onChange={(e) => this.onChangeFields(e)} name="reportCard" label="Студенческий" />
          <TextField className={classes.field} value={this.state.data.email || ''} onChange={(e) => this.onChangeFields(e)} name="email" label="Email" type="email" />
          <Autocomplete
            className={classes.field}
            id="roleSelect"
            name="roleId"
            autoHighlight
            options={this.props.userList.userRoleData}
            getOptionLabel={(option) => option.name}
            defaultValue={defaultRole}
            renderInput={(params) => <TextField {...params} label="Роль" />}
            onChange={(event, option) => {
              this.setState((prevState) => ({
                data: {
                  ...prevState.data,
                  role: {
                    id: option.id,
                  },
                },
              }));
            }}
          />
          <Autocomplete
            className={classes.field}
            id="groupSelect"
            autoHighlight
            name="groupId"
            options={this.props.userList.userGroupData}
            getOptionLabel={(option) => option.name}
            defaultValue={defaultGroup}
            renderInput={(params) => <TextField {...params} label="Группа" />}
            onChange={(event, option) => {
              this.setState((prevState) => ({
                data: {
                  ...prevState.data,
                  group: {
                    id: option.id,
                  },
                },
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.cancel()} color="primary">
            Отмена
          </Button>
          <Button onClick={() => this.save()} color="primary">
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

const mapDispatchToProps = () => (dispatch) => ({
  putChanges: (data) => dispatch(putChanges(data)),
  showNotification: (message, variant, option, action) => dispatch(ShowNotification(message, variant, option, action)),
});

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEdit)));
