import {
  Box,
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object({
  userName: yup
    .string('Введите имя пользователя')
    .required('Имя пользователя обязательно'),
  surname: yup
    .string('Введите Фамилию')
    .required('Фамилия обязательна'),
  name: yup
    .string('Введите имя')
    .required('Имя обязательно'),
  reportCard: yup
    .string('Введите идентификатор')
    .required('Идентификатор обязателен'),
  email: yup
    .string('Введите почту')
    .email('Неверная почта')
    .required('Почта обязательна'),
  roleId: yup
    .string('Выберите роль')
    .required('Роль обязательна'),
  groupId: yup
    .string('Выберите группу')
    .required('Группа обязательна'),
});

class UserEdit extends React.Component {
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
  }

  save(data) {
    this.props.putChanges({
      id: data.id,
      userName: data.userName,
      surname: data.surname,
      name: data.name,
      patronymic: data.patronymic,
      reportCard: data.reportCard,
      email: data.email,
      role: {
        id: data.roleId,
      },
      group: {
        id: data.groupId,
      },
    });
    this.props.close('userEditOpen');
  }

  renderDialogBody() {
    const { classes } = this.props;
    if (this.props.userList.userByIdLoading) {
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

    const { userById } = this.props.userList;
    const defaultRole = this.props.userList.userRoleData.find((item) => item.id === userById.role.id);
    const defaultGroup = this.props.userList.userGroupData.find((item) => item.id === userById.group.id);
    return (
      <Formik
        initialValues={{
          id: userById.id || '',
          userName: userById.userName || '',
          surname: userById.surname || '',
          name: userById.name || '',
          patronymic: userById.patronymic || '',
          reportCard: userById.reportCard || '',
          email: userById.email || '',
          roleId: userById.role.id || '',
          groupId: userById.group.id || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => this.save(values)}
      >
        {({
          values, errors, touched, handleChange, handleSubmit, setFieldValue,
        }) => (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <DialogContent className={classes.dialogBody}>
              <TextField className={classes.field} value={values.userName} onChange={(e) => handleChange(e)} name="userName" label="Имя пользователя" error={touched.userName && Boolean(errors.userName)} helperText={touched.userName && errors.userName} />
              <TextField className={classes.field} value={values.surname} onChange={(e) => handleChange(e)} name="surname" label="Фамилия" error={touched.surname && Boolean(errors.surname)} helperText={touched.surname && errors.surname} />
              <TextField className={classes.field} value={values.name} onChange={(e) => handleChange(e)} name="name" label="Имя" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
              <TextField className={classes.field} value={values.patronymic} onChange={(e) => handleChange(e)} name="patronymic" label="Отчество" error={touched.patronymic && Boolean(errors.patronymic)} helperText={touched.patronymic && errors.patronymic} />
              <TextField className={classes.field} value={values.reportCard} onChange={(e) => handleChange(e)} name="reportCard" label="Идентификатор" error={touched.reportCard && Boolean(errors.reportCard)} helperText={touched.reportCard && errors.reportCard} />
              <TextField className={classes.field} value={values.email} onChange={(e) => handleChange(e)} name="email" label="Email" type="email" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
              <Autocomplete
                className={classes.field}
                id="roleSelect"
                name="roleId"
                autoHighlight
                options={this.props.userList.userRoleData}
                getOptionLabel={(option) => option.name}
                defaultValue={defaultRole}
                renderInput={(params) => <TextField {...params} label="Роль" error={touched.roleId && Boolean(errors.roleId)} helperText={touched.roleId && errors.roleId} />}
                onChange={(_, option) => setFieldValue('roleId', option ? option.id : '')}
              />
              <Autocomplete
                className={classes.field}
                id="groupSelect"
                autoHighlight
                name="groupId"
                options={this.props.userList.userGroupData}
                getOptionLabel={(option) => option.name}
                defaultValue={defaultGroup}
                renderInput={(params) => <TextField {...params} label="Группа" error={touched.groupId && Boolean(errors.groupId)} helperText={touched.groupId && errors.groupId} />}
                onChange={(_, option) => setFieldValue('groupId', option ? option.id : '')}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.cancel()} color="primary">
                Отмена
              </Button>
              <Button color="primary" type="submit">
                Сохранить
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
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
