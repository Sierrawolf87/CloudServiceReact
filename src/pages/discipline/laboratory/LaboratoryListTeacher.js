/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, withStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { CSCard } from '../../../modules/components/CSCard/CSCard';
import {
  createLaboratory, deleteLaboratory, getTeacherLaboratoryList, SetSearchText,
} from './LaboratorySlice';

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
  labCard: {
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
    .string('Введите название лабораторной')
    .required('Название лабораторной обязательно'),
});

// eslint-disable-next-line react/prefer-stateless-function
class LaboratoryListTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createDialogOpen: false,
      deleteDialogOpen: false,
      deleteDisciplineId: '',
    };
  }

  componentDidMount() {
    this.props.getTeacherLaboratoryList(this.props.match.params.id);
  }

  getLabList() {
    const { classes, laboratory } = this.props;
    if (laboratory.studentLaboratoryListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {laboratory.studentLaboratoryList.map((item) => (
            <CSCard
              className={classes.labCard}
              key={item.laboratory.id}
              header={item.discipline.name}
              title={item.laboratory.name}
              signature={`Сдано: ${item.solutionsCount}`}
              body={item.requirement != null ? item.requirement : ''}
              link={`/teacher/discipline/laboratory/${item.laboratory.id}`}
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
            disciplineId: this.props.match.params.id,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => { this.props.createLaboratory(values, this.props.match.params.id); this.setState({ createDialogOpen: false }); }}
        >
          {({
            values, errors, touched, handleChange, handleSubmit,
          }) => (
            <Form onSubmit={(e) => handleSubmit(e)}>
              <DialogContent className={classes.dialogBody}>
                <TextField className={classes.field} value={values.name} onChange={(e) => handleChange(e)} name="name" label="Название лабораторной" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
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
            {`Вы действительно хотите лабораторную работу?
          Это приведёт к удалению всех связанных решений.`}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ deleteDialogOpen: false })} color="primary">
              Отмена
            </Button>
            <Button onClick={() => this.deleteLaboratory(this.state.deleteDisciplineId, this.props.match.params.id)} color="secondary">
              Удалить
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }

  render() {
    const { classes, laboratory } = this.props;
    return (
      <Box>
        <Box className={classes.mainBlock}>
          <Box className={classes.filterBlock}>
            <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => { this.props.SetSearchText(event.target.value); this.props.getTeacherLaboratoryList(this.props.match.params.id, event.target.value); }} value={laboratory.searchText} />
          </Box>
          <Box className={classes.root}>
            {this.getLabList()}
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
  laboratory: state.laboratory,
});

const mapDispatchToProps = () => (dispatch) => ({
  getTeacherLaboratoryList: (disciplineId, text) => dispatch(getTeacherLaboratoryList(disciplineId, text)),
  SetSearchText: (text) => dispatch(SetSearchText(text)),
  createLaboratory: (data, disciplineId) => dispatch(createLaboratory(data, disciplineId)),
  deleteLaboratory: (data, disciplineId) => dispatch(deleteLaboratory(data, disciplineId)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryListTeacher)));
