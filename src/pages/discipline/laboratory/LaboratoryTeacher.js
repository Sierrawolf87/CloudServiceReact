/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField, Typography, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { GetApp, Delete, Add } from '@material-ui/icons';
import { FileDrop } from 'react-file-drop';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import {
  ChangeRequirementDescription, deleteFile, getRequirement, SetMark, getSolutionById, getStudentLaboratoryListForTeatcher, updateRequirementDescription, uploadFiles, updateMark, uploadFilesRequirement, deleteFileTeacher,
} from './LaboratorySlice';
import { CSCard } from '../../../modules/components/CSCard/CSCard';

const style = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
  studentListTeacher: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  requirementsBlock: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: '50px',
    marginBottom: '50px',
    padding: '10px',
    borderRadius: '5px',
  },
  fileList: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '10px',
  },
  fileCell: {
    width: 'max-content',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px',
    marginLeft: '15px',
    marginBottom: '10px',
  },
  fileCellUpload: {
    width: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px',
    marginLeft: '15px',
    marginBottom: '10px',
    border: `2px dashed ${theme.palette.text.primary}`,
    cursor: 'pointer',
  },
  icon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  description: {
    width: '100%',
  },
  labCard: {
    cursor: 'pointer',
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class LaboratoryTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutionOpen: false,
    };
  }

  componentDidMount() {
    this.props.getRequirement(this.props.match.params.id);
    this.props.getStudentLaboratoryListForTeatcher(this.props.match.params.id);
  }

  getCsCardColorClass(mark) {
    const { classes } = this.props;
    if (mark <= 3) { return classes.error; }
    if (mark <= 7) { return classes.warning; }
    if (mark <= 10) { return classes.success; }
    return classes.error;
  }

  getAddFilesBlock() {
    const { classes, laboratory } = this.props;
    if (laboratory.uploadProgress >= 0) {
      return (
        <Paper className={classes.fileCellUpload}>
          <CircularProgress variant="determinate" value={laboratory.uploadProgress} />
        </Paper>
      );
    }
    return (
      <Paper className={classes.fileCellUpload}>
        <Add />
        <Typography>Добавить файлы</Typography>
      </Paper>
    );
  }

  getRequirementsFileListBlock() {
    const { classes, laboratory } = this.props;
    if (laboratory.requirementLoading === false) {
      return (
        <>
          {laboratory.requirement.files.map((element) => (
            <Paper key={new Date().getTime() + Math.random()} className={classes.fileCell}>
              {element.name}
              <IconButton size="small" onClick={() => window.open(`${axios.defaults.baseURL}/Files/DownloadRequirementsFile/${laboratory.requirement.id}/${element.id}`)}>
                <GetApp />
              </IconButton>
              <IconButton size="small" onClick={() => this.props.deleteFileTeacher(element.id, this.props.match.params.id)}>
                <Delete />
              </IconButton>
            </Paper>
          ))}
        </>
      );
    }
    return (<CircularProgress />);
  }

  getRequirementsBlock() {
    const { classes, laboratory } = this.props;
    return (
      <Paper className={classes.requirementsBlock}>
        <Typography variant="h4">Условие:</Typography>
        <Box className={classes.fileList}>
          {this.getRequirementsFileListBlock()}
        </Box>
        <input style={{ position: 'absolute', opacity: 0 }} multiple type="file" id="solutionfiles" onChange={(e) => this.props.uploadFilesRequirement(e.target.files, this.props.match.params.id, laboratory.requirement.id)} />
        <FileDrop onDrop={(e) => this.props.uploadFilesRequirement(e, this.props.match.params.id, laboratory.requirement.id)}>
          <label htmlFor="solutionfiles">
            {this.getAddFilesBlock()}
          </label>
        </FileDrop>
        <TextField
          className={classes.description}
          label="Описание"
          multiline
          variant="outlined"
          value={laboratory.requirement.description}
          onChange={(e) => this.props.ChangeRequirementDescription(e.target.value)}
          onBlur={() => this.props.updateRequirementDescription(laboratory.requirement)}
        />
        <Button className={classes.description} color="primary" onClick={() => window.open(`${axios.defaults.baseURL}Files/DownloadRequirements/${laboratory.requirement.id}`)}>Скачать zip архивом</Button>
      </Paper>
    );
  }

  getSolutionFileListBlock() {
    const { classes, laboratory } = this.props;
    if (laboratory.solutionLoading === false) {
      return (
        <>
          {laboratory.solution.files.map((element) => (
            <Paper key={new Date().getTime() + Math.random()} className={classes.fileCell}>
              {element.name}
              <IconButton size="small" onClick={() => window.open(`${axios.defaults.baseURL}Files/DownloadSolutionFile/${laboratory.solution.id}/${element.id}`)}>
                <GetApp />
              </IconButton>
              <IconButton size="small" onClick={() => this.props.deleteFile(element.id, this.props.match.params.id)}>
                <Delete />
              </IconButton>
            </Paper>
          ))}
        </>
      );
    }
    return (<CircularProgress />);
  }

  getSolutionBlock() {
    const { classes, laboratory } = this.props;
    if (laboratory.solutionLoading === false) {
      return (
        <Paper className={classes.solutionBlock}>
          <Box className={classes.fileList}>
            {this.getSolutionFileListBlock()}
          </Box>
          <TextField
            className={classes.description}
            label="Описание"
            variant="outlined"
            multiline
            value={laboratory.solution.description}
          />
          <Button className={classes.description} color="primary" onClick={() => window.open(`${axios.defaults.baseURL}Files/DownloadSolution/${laboratory.solution.id}`)}>Скачать zip архивом</Button>
          <Box className={classes.mark}>
            Отметка:
            <Pagination count={10} siblingCount={10} page={+laboratory.solution.mark} hideNextButton hidePrevButton onChange={(e) => { this.props.setMark(+e.target.textContent); this.props.updateMark(laboratory.solution.id, e.target.textContent); }} />
          </Box>
        </Paper>
      );
    }
    return (<CircularProgress />);
  }

  getSolutionListBlock() {
    const { classes, laboratory } = this.props;
    if (!laboratory.studentLaboratoryListTeatcherLoading) {
      return (
        <Box className={classes.studentListTeacher}>
          {laboratory.studentLaboratoryListTeatcher.map((item) => (
            <CSCard
              className={`${classes.labCard} ${this.getCsCardColorClass(item.mark)}`}
              key={new Date().getTime() + Math.random()}
              title={item.initials}
              signature={`Отметка: ${item.mark}`}
              body={item.requirement != null ? item.requirement.Description : ''}
              onClick={() => {
                this.setState({
                  solutionOpen: true,
                });
                this.props.getSolutionById(item.solutionId);
              }}
            />
          ))}
        </Box>
      );
    }
    return (<CircularProgress />);
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.getRequirementsBlock()}
        {this.getSolutionListBlock()}
        <Dialog open={this.state.solutionOpen} onClose={() => { this.setState({ solutionOpen: false }); }} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Решение:</DialogTitle>
          <DialogContent className={classes.dialogBody}>
            {this.getSolutionBlock()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { this.setState({ solutionOpen: false }); }} color="primary">
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  laboratory: state.laboratory,
});

const mapDispatchToProps = () => (dispatch) => ({
  getSolutionById: (id) => dispatch(getSolutionById(id)),
  getRequirement: (id) => dispatch(getRequirement(id)),
  setMark: (mark) => dispatch(SetMark(mark)),
  deleteFile: (fileId, laboratoryId) => dispatch(deleteFile(fileId, laboratoryId)),
  deleteFileTeacher: (fileId, laboratoryId) => dispatch(deleteFileTeacher(fileId, laboratoryId)),
  ChangeRequirementDescription: (text) => dispatch(ChangeRequirementDescription(text)),
  updateRequirementDescription: (solutionObject) => dispatch(updateRequirementDescription(solutionObject)),
  uploadFiles: (files, laboratoryId, solutionId) => dispatch(uploadFiles(files, laboratoryId, solutionId)),
  updateMark: (id, mark) => dispatch(updateMark(id, mark)),
  getStudentLaboratoryListForTeatcher: (id) => dispatch(getStudentLaboratoryListForTeatcher(id)),
  uploadFilesRequirement: (files, laboratoryId, requirementId) => dispatch(uploadFilesRequirement(files, laboratoryId, requirementId)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryTeacher)));
