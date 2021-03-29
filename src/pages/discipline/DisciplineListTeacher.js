/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, withStyles,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { CSCard } from '../../modules/components/CSCard/CSCard';
import {
  getTeacherDisciplineList, SetSearchText, getGroupList, createDiscipline, deleteDiscipline,
} from './DisciplineSliсe';

const style = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
  rootBlock: {
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterBlock: {
    width: '95vw',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10px',
  },
  dispCard: {
    cursor: 'pointer',
  },
  fabMargin: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    margin: theme.spacing(1),
  },
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
  name: yup
    .string('Введите название дисциплиы')
    .required('Название дисциплиы обязательно'),
  shortName: yup
    .string('Введите коротное название')
    .required('Короткое название обязательно'),
  groupId: yup
    .string('Выберите группу')
    .required('Группа обязательна'),
});

// eslint-disable-next-line react/prefer-stateless-function
class DisciplineListTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createDialogOpen: false,
      deleteDialogOpen: false,
      deleteDisciplineId: '',
    };
  }

  componentDidMount() {
    this.props.getTeacherDisciplineList();
    this.props.getGroupList();
  }

  getLDispList() {
    const { classes, discipline } = this.props;
    if (discipline.disciplineListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {discipline.disciplineList.map((item) => (
            <CSCard
              className={classes.dispCard}
              key={item.discipline.id}
              id={item.discipline.id}
              header={item.discipline.name}
              title={item.discipline.shortName}
              signature={item.group.name}
              body=""
              link={`/teacher/discipline/${item.discipline.id}`}
              buttons={[
                {
                  actionOnClick: (id) => {
                    this.setState({
                      deleteDialogOpen: true,
                      deleteDisciplineId: id,
                    });
                  },
                  icon: <Delete />,
                }]}
            />
          ))}
        </Box>
      );
    }
    return (<CircularProgress />);
  }

  createDialog() {
    const { classes } = this.props;
    return (
      <Dialog open={this.state.createDialogOpen} onClose={() => this.setState({ createDialogOpen: false })} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создание</DialogTitle>
        <Formik
          initialValues={{
            id: '',
            name: '',
            shortName: '',
            groupId: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => { this.props.createDiscipline(values); this.setState({ createDialogOpen: false }); }}
        >
          {({
            values, errors, touched, handleChange, handleSubmit, setFieldValue,
          }) => (
            <Form onSubmit={(e) => handleSubmit(e)}>
              <DialogContent className={classes.dialogBody}>
                <TextField className={classes.field} value={values.name} onChange={(e) => handleChange(e)} name="name" label="Название" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
                <TextField className={classes.field} value={values.shortName} onChange={(e) => handleChange(e)} name="shortName" label="Короткое название" error={touched.userName && Boolean(errors.userName)} helperText={touched.shortName && errors.shortName} />
                <Autocomplete
                  className={classes.field}
                  id="groupSelect"
                  autoHighlight
                  name="groupId"
                  options={this.props.discipline.groupList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Группа" error={touched.groupId && Boolean(errors.groupId)} helperText={touched.groupId && errors.groupId} />}
                  onChange={(_, option) => setFieldValue('groupId', option ? option.id : '')}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({ createDialogOpen: false })} color="primary">
                  Отмена
                </Button>
                <Button color="primary" type="submit">
                  Создать
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }

  deleteDialog() {
    const { classes } = this.props;
    return (
      <Dialog open={this.state.deleteDialogOpen} onClose={() => this.setState({ deleteDialogOpen: false })} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Удаление</DialogTitle>
        <Box>
          <DialogContent className={classes.dialogBody}>
            {`Вы действительно хотите дисциплину?
          Это приведёт к удалению всех связанных лабораторных работ.`}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ deleteDialogOpen: false })} color="primary">
              Отмена
            </Button>
            <Button onClick={() => this.props.deleteDiscipline(this.state.deleteDisciplineId)} color="secondary">
              Удалить
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }

  render() {
    const { classes, discipline } = this.props;
    return (
      <Box>
        <Box className={classes.mainBlock}>
          <Box className={classes.filterBlock}>
            <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => { this.props.SetSearchText(event.target.value); this.props.getTeacherDisciplineList(event.target.value); }} value={discipline.searchText} />
          </Box>
          <Box className={classes.root}>
            {this.getLDispList()}
          </Box>
          <Fab
            variant="extended"
            size="large"
            color="primary"
            aria-label="create"
            className={classes.fabMargin}
            onClick={() => this.setState({ createDialogOpen: true })}
          >
            <Add className={classes.fabExtendedIcon} />
            Создать
          </Fab>
        </Box>
        {this.createDialog()}
        {this.deleteDialog()}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  discipline: state.discipline,
});

const mapDispatchToProps = () => (dispatch) => ({
  getTeacherDisciplineList: (text) => dispatch(getTeacherDisciplineList(text)),
  SetSearchText: (text) => dispatch(SetSearchText(text)),
  getGroupList: () => dispatch(getGroupList()),
  createDiscipline: (data) => dispatch(createDiscipline(data)),
  deleteDiscipline: (id) => dispatch(deleteDiscipline(id)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisciplineListTeacher)));
