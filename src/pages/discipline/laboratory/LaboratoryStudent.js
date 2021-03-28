/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, Button, CircularProgress, IconButton, Paper, TextField, Typography, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { GetApp, Delete, Add } from '@material-ui/icons';
import { FileDrop } from 'react-file-drop';
import axios from 'axios';
import {
  ChangeSolutionDescription, deleteFile, getRequirement, getSolution, updateSolutionDescription, uploadFiles,
} from './LaboratorySlice';

const style = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
  solutionBlock: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: '50px',
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
});

// eslint-disable-next-line react/prefer-stateless-function
class LaboratoryStudent extends React.Component {
  componentDidMount() {
    this.props.getSolution(this.props.match.params.id);
    this.props.getRequirement(this.props.match.params.id);
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
              <IconButton size="small" onClick={() => window.open(`${axios.defaults.baseURL}Files/DownloadRequirementsFile/${laboratory.requirement.id}/${element.id}`)}>
                <GetApp />
              </IconButton>
            </Paper>
          ))}
        </>
      );
    }
    return (<CircularProgress />);
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

  getRequirementsBlock() {
    const { classes, laboratory } = this.props;
    return (
      <Paper className={classes.solutionBlock}>
        <Typography variant="h4">Условие:</Typography>
        <Box className={classes.fileList}>
          {this.getRequirementsFileListBlock()}
        </Box>
        <TextField
          className={classes.description}
          label="Описание"
          multiline
          variant="outlined"
          value={laboratory.requirement.requirement}
        />
        <Button className={classes.description} color="primary" onClick={() => window.open(`${axios.defaults.baseURL}Files/DownloadRequirements/${laboratory.requirement.id}`)}>Скачать zip архивом</Button>
      </Paper>
    );
  }

  getSolutionBlock() {
    const { classes, laboratory } = this.props;
    return (
      <Paper className={classes.solutionBlock}>
        <Typography variant="h4">Решение:</Typography>
        <Box className={classes.fileList}>
          {this.getSolutionFileListBlock()}
          <input style={{ position: 'absolute', opacity: 0 }} multiple type="file" id="solutionfiles" onChange={(e) => this.props.uploadFiles(e.target.files, this.props.match.params.id, laboratory.solution.id)} />
          <FileDrop onDrop={(e) => this.props.uploadFiles(e, this.props.match.params.id, laboratory.solution.id)}>
            <label htmlFor="solutionfiles">
              {this.getAddFilesBlock()}
            </label>
          </FileDrop>
        </Box>
        <TextField
          className={classes.description}
          label="Описание"
          variant="outlined"
          multiline
          value={laboratory.solution.description}
          onChange={(e) => this.props.ChangeSolutionDescription(e.target.value)}
          onBlur={() => this.props.updateSolutionDescription(laboratory.solution)}
        />
        <Button className={classes.description} color="primary" onClick={() => window.open(`${axios.defaults.baseURL}Files/DownloadSolution/${laboratory.solution.id}`)}>Скачать zip архивом</Button>
      </Paper>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.getRequirementsBlock()}
        {this.getSolutionBlock()}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  laboratory: state.laboratory,
});

const mapDispatchToProps = () => (dispatch) => ({
  getSolution: (id) => dispatch(getSolution(id)),
  getRequirement: (id) => dispatch(getRequirement(id)),
  deleteFile: (fileId, laboratoryId) => dispatch(deleteFile(fileId, laboratoryId)),
  ChangeSolutionDescription: (text) => dispatch(ChangeSolutionDescription(text)),
  updateSolutionDescription: (solutionObject) => dispatch(updateSolutionDescription(solutionObject)),
  uploadFiles: (files, laboratoryId, solutionId) => dispatch(uploadFiles(files, laboratoryId, solutionId)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryStudent)));
