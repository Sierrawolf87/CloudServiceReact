import {
  Box,
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { createUser } from '../UserListSlice';
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

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        surname: '',
        name: '',
        patronymic: '',
        reportCard: '',
        role: {
          id: '',
        },
        group: {
          id: '',
        },
      },
    };
  }

  onChangeFields(e) {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value,
      },
    }));
  }

  clearState() {
    this.setState({
      data: {
        surname: '',
        name: '',
        patronymic: '',
        reportCard: '',
        role: {
          id: '',
        },
        group: {
          id: '',
        },
      },
    });
  }

  cancel() {
    this.props.close('userCreateOpen');
    this.props.showNotification('Изменения не сохранены', 'info');
    this.clearState();
  }

  save() {
    this.props.createUser(this.state.data);
    this.props.close('userCreateOpen');
    this.clearState();
  }

  renderDialogBody() {
    const { classes } = this.props;
    if (this.props.userList.userRoleData === [] || this.props.userList.userGroupData === []) {
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

    const defaultRole = this.props.userList.userRoleData.find((item) => item.name === 'student');
    const defaultGroup = this.props.userList.userGroupData[0];

    return (
      <Box>
        <DialogContent className={classes.dialogBody}>
          <TextField className={classes.field} value={this.state.data.surname || ''} onChange={(e) => this.onChangeFields(e)} name="surname" label="Фамилия" />
          <TextField className={classes.field} value={this.state.data.name || ''} onChange={(e) => this.onChangeFields(e)} name="name" label="Имя" />
          <TextField className={classes.field} value={this.state.data.patronymic || ''} onChange={(e) => this.onChangeFields(e)} name="patronymic" label="Отчество" />
          <TextField className={classes.field} value={this.state.data.reportCard || ''} onChange={(e) => this.onChangeFields(e)} name="reportCard" label="Студенческий" />
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
                    id: option.id || '',
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
                    id: option.id || '',
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
            Создать
          </Button>
        </DialogActions>
      </Box>
    );
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Dialog open={isOpen} onClose={() => this.cancel()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создание</DialogTitle>
        {this.renderDialogBody()}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
});

const mapDispatchToProps = () => (dispatch) => ({
  createUser: (data) => dispatch(createUser(data)),
  showNotification: (message, variant, option, action) => dispatch(ShowNotification(message, variant, option, action)),
});

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCreate)));
