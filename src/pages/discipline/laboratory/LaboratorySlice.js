import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { ShowNotification } from '../../../modules/Alert/AlertSlice';

export const authSlice = createSlice({
  name: 'laboratory',
  initialState: {
    solution: {
      id: '',
      ownerId: '',
      description: '',
      mark: '',
      LaboratoryWorkId: '',
      files: [],
    },
    studentLaboratoryList: [],
    solutionLoading: true,
    studentLaboratoryListLoading: true,
  },
  reducers: {
    GetSoulutionStart: (state) => {
      state.solution = {};
      state.solutionLoading = true;
    },
    GetSoulutionSuccessful: (state, action) => {
      state.solution = action.payload;
      state.solutionLoading = false;
    },
    GetSoulutionFailure: (state) => {
      state.solutionLoading = true;
    },
    ChangeSolutionDescription: (state, action) => {
      state.solution.description = action.payload;
    },
    GetStudentLaboratoryListStart: (state) => {
      state.studentLaboratoryList = [];
      state.studentLaboratoryListLoading = true;
    },
    GetStudentLaboratoryListSuccessful: (state, action) => {
      state.studentLaboratoryList = action.payload;
      state.studentLaboratoryListLoading = false;
    },
    GetStudentLaboratoryListFailure: (state) => {
      state.studentLaboratoryListLoading = true;
    },
  },
});

export const {
  GetSoulutionStart, GetSoulutionSuccessful, GetSoulutionFailure, ChangeSolutionDescription,
  GetStudentLaboratoryListStart, GetStudentLaboratoryListSuccessful, GetStudentLaboratoryListFailure,
} = authSlice.actions;

export const getSolution = (id) => (dispatch) => {
  dispatch(GetSoulutionStart());
  axios({
    url: `Disciplines/LaboratoryWorks/Solutions/${id}/GetMySolution`,
    method: 'GET',
  })
    .then((res) => {
      dispatch(GetSoulutionSuccessful(res.data));
    })
    .catch((error) => {
      dispatch(GetSoulutionFailure());
      return error;
    });
};

export const deleteFile = (fileId, laboratoryId) => (dispatch) => {
  axios({
    url: `Files/${fileId}`,
    method: 'DELETE',
  })
    .then(() => {
      dispatch(getSolution(laboratoryId));
    })
    .catch((error) => error);
};

export const updateSolutionDescription = (solutionObject) => (dispatch) => {
  axios({
    url: `Disciplines/LaboratoryWorks/Solutions/${solutionObject.id}`,
    method: 'PUT',
    data: solutionObject,
  })
    .then(() => { dispatch(); })
    .catch((error) => error);
};

export const uploadFiles = (files, laboratoryId, solutionId) => (dispatch) => {
  const formdata = new FormData();
  console.log(files);
  for (let index = 0; index < files.length; index += 1) {
    formdata.append('file', files[index]);
  }
  console.log(formdata);
  axios({
    url: `Files/PostSolutionFiles/${solutionId}`,
    method: 'POST',
    data: formdata,
  })
    .then(() => {
      dispatch(getSolution(laboratoryId));
    })
    .catch((error) => error);
};

export const getStudentLaboratoryList = (disciplineId) => (dispatch) => {
  dispatch(GetStudentLaboratoryListStart());
  axios({
    url: `Disciplines/LaboratoryWorks/GetLaboratoryListByDisciplineStudent/${disciplineId}`,
    method: 'GET',
  })
    .then((res) => dispatch(GetStudentLaboratoryListSuccessful(res.data)))
    .catch((error) => error);
};

export default authSlice.reducer;
