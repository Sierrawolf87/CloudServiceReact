/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, Button, IconButton, Paper, TextField, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { GetApp, Delete, Add } from '@material-ui/icons';
import axios from 'axios';
import {
  ChangeSolutionDescription, deleteFile, getSolution, updateSolutionDescription, uploadFiles,
} from './LaboratorySlice';

const style = (theme) => ({
  solutionBlock: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '5px',
  },
  fileList: {
    width: '100%',
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
    justifyContent: 'centert',
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
  }

  getSolutionBlock() {
    const { classes, laboratory } = this.props;
    if (laboratory.solutionLoading === false) {
      return (
        <Box className={classes.solutionBlock}>
          <Box className={classes.fileList}>
            {laboratory.solution.files.map((element) => (
              <Paper key={new Date().getTime() + Math.random()} className={classes.fileCell}>
                {element.name}
                <IconButton size="small" onClick={() => window.open(`${axios.defaults.baseURL}/Files/DownloadSolutionFile/${laboratory.solution.id}/${element.id}`)}>
                  <GetApp />
                </IconButton>
                <IconButton size="small" onClick={() => this.props.deleteFile(element.id, this.props.match.params.id)}>
                  <Delete />
                </IconButton>
              </Paper>
            ))}
            <input style={{ position: 'absolute', opacity: 0 }} multiple type="file" id="solutionfiles" onChange={(e) => this.props.uploadFiles(e.target.files, this.props.match.params.id, laboratory.solution.id)} />
            <label htmlFor="solutionfiles">
              <Paper className={classes.fileCellUpload}>
                <Add />
                Добавить файлы
              </Paper>
            </label>
          </Box>
          <TextField
            className={classes.description}
            label="Описание"
            variant="outlined"
            value={laboratory.solution.description}
            onChange={(e) => this.props.ChangeSolutionDescription(e.target.value)}
            onBlur={() => this.props.updateSolutionDescription(laboratory.solution)}
          />
          <Button className={classes.description} color="primary" onClick={() => window.open(`${axios.defaults.baseURL}/Files/DownloadSolution/${laboratory.solution.id}`)}>Скачать zip архивом</Button>
        </Box>
      );
    }
    return (<Box />);
  }

  render() {
    /* const { classes, filename } = this.props; */
    return (
      <Box>
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
  deleteFile: (fileId, laboratoryId) => dispatch(deleteFile(fileId, laboratoryId)),
  ChangeSolutionDescription: (text) => dispatch(ChangeSolutionDescription(text)),
  updateSolutionDescription: (solutionObject) => dispatch(updateSolutionDescription(solutionObject)),
  uploadFiles: (files, laboratoryId, solutionId) => dispatch(uploadFiles(files, laboratoryId, solutionId)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryStudent)));
