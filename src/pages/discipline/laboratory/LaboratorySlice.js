import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ShowNotification } from '../../../modules/Alert/AlertSlice';

export const LaboratorySlice = createSlice({
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
    requirement: {
      id: '',
      ownerId: '',
      description: '',
      LaboratoryWorkId: '',
      files: [],
    },
    studentLaboratoryList: [],
    studentLaboratoryListTeatcher: [],
    searchText: '',
    solutionLoading: true,
    studentLaboratoryListLoading: true,
    studentLaboratoryListTeatcherLoading: true,
    requirementLoading: true,
    uploadProgress: -1,
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
    GetRequirementStart: (state) => {
      state.requirement = {};
      state.requirementLoading = true;
    },
    GetRequirementSuccessful: (state, action) => {
      state.requirement = action.payload;
      state.requirementLoading = false;
    },
    GetRequirementFailure: (state) => {
      state.requirementLoading = true;
    },
    ChangeSolutionDescription: (state, action) => {
      state.solution.description = action.payload;
    },
    ChangeRequirementDescription: (state, action) => {
      state.requirement.description = action.payload;
    },
    SetSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    SetMark: (state, action) => {
      state.solution.mark = action.payload;
    },
    GetStudentLaboratoryListSuccessful: (state, action) => {
      state.studentLaboratoryList = action.payload;
      state.studentLaboratoryListLoading = false;
    },
    GetStudentLaboratoryListFailure: (state) => {
      state.studentLaboratoryListLoading = true;
    },
    GetStudentLaboratoryListTeatcherStart: (state) => {
      state.studentLaboratoryListTeatcherLoading = true;
    },
    GetStudentLaboratoryListTeatcherSuccessful: (state, action) => {
      state.studentLaboratoryListTeatcher = action.payload;
      state.studentLaboratoryListTeatcherLoading = false;
    },
    GetStudentLaboratoryListTeatcherFailure: (state) => {
      state.studentLaboratoryListTeatcherLoading = false;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const {
  GetSoulutionStart, GetSoulutionSuccessful, GetSoulutionFailure, ChangeSolutionDescription,
  GetStudentLaboratoryListStart, GetStudentLaboratoryListSuccessful, GetStudentLaboratoryListFailure,
  SetSearchText, setUploadProgress, GetRequirementStart, GetRequirementSuccessful, GetRequirementFailure,
  ChangeRequirementDescription, GetStudentLaboratoryListTeatcherStart, GetStudentLaboratoryListTeatcherSuccessful,
  GetStudentLaboratoryListTeatcherFailure, SetMark,
} = LaboratorySlice.actions;

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

export const getSolutionById = (id) => (dispatch) => {
  dispatch(GetSoulutionStart());
  axios({
    url: `Disciplines/LaboratoryWorks/Solutions/${id}`,
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

export const getRequirement = (id) => (dispatch) => {
  dispatch(GetRequirementStart());
  axios({
    url: `Disciplines/LaboratoryWorks/Requirements/GetByLaboratory/${id}`,
    method: 'GET',
  })
    .then((res) => {
      dispatch(GetRequirementSuccessful(res.data));
    })
    .catch((error) => {
      dispatch(GetRequirementFailure());
      return error;
    });
};

export const getStudentLaboratoryListForTeatcher = (id) => (dispatch) => {
  dispatch(GetStudentLaboratoryListTeatcherStart());
  axios({
    url: `Disciplines/LaboratoryWorks/GetStudentLaboratoryListForTeatcher/${id}`,
    method: 'GET',
  })
    .then((res) => {
      dispatch(GetStudentLaboratoryListTeatcherSuccessful(res.data));
    })
    .catch((error) => {
      dispatch(GetStudentLaboratoryListTeatcherFailure());
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

export const deleteFileTeacher = (fileId, laboratoryId) => (dispatch) => {
  axios({
    url: `Files/${fileId}`,
    method: 'DELETE',
  })
    .then(() => {
      dispatch(getRequirement(laboratoryId));
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

export const updateMark = (id, mark) => (dispatch) => {
  axios({
    url: `Disciplines/LaboratoryWorks/Solutions/${id}/udpateMark/${mark}`,
    method: 'PUT',
  })
    .then(() => { dispatch(); })
    .catch((error) => error);
};

export const updateRequirementDescription = (solutionObject) => (dispatch) => {
  axios({
    url: `Disciplines/LaboratoryWorks/Requirements/${solutionObject.id}`,
    method: 'PUT',
    data: solutionObject,
  })
    .then(() => { dispatch(); })
    .catch((error) => error);
};

export const uploadFilesRequirement = (files, laboratoryId, requirementId) => (dispatch) => {
  const formdata = new FormData();
  for (let index = 0; index < files.length; index += 1) {
    formdata.append('file', files[index]);
  }
  axios({
    url: `Files/PostRequirementFiles/${requirementId}`,
    method: 'POST',
    data: formdata,
    onUploadProgress: (progress) => dispatch(setUploadProgress(Math.round((progress.loaded * 100) / progress.total))),
  })
    .then(() => {
      dispatch(getRequirement(laboratoryId));
      dispatch(ShowNotification('Файлы успешно загружены', 'success'));
      dispatch(setUploadProgress(-1));
    })
    .catch((error) => {
      dispatch(setUploadProgress(-1));
      dispatch(ShowNotification('Ошибка при загрузке файлов', 'error'));
      return error;
    });
};

export const uploadFiles = (files, laboratoryId, solutionId) => (dispatch) => {
  const formdata = new FormData();
  for (let index = 0; index < files.length; index += 1) {
    formdata.append('file', files[index]);
  }
  axios({
    url: `Files/PostSolutionFiles/${solutionId}`,
    method: 'POST',
    data: formdata,
    onUploadProgress: (progress) => dispatch(setUploadProgress(Math.round((progress.loaded * 100) / progress.total))),
  })
    .then(() => {
      dispatch(getSolution(laboratoryId));
      dispatch(ShowNotification('Файлы успешно загружены', 'success'));
      dispatch(setUploadProgress(-1));
    })
    .catch((error) => {
      dispatch(setUploadProgress(-1));
      dispatch(ShowNotification('Ошибка при загрузке файлов', 'error'));
      return error;
    });
};

export const getStudentLaboratoryList = (disciplineId, text = '') => (dispatch) => {
  axios({
    url: `Disciplines/LaboratoryWorks/GetLaboratoryListByDisciplineStudent/${disciplineId}?search=${text}`,
    method: 'GET',
  })
    .then((res) => dispatch(GetStudentLaboratoryListSuccessful(res.data)))
    .catch((error) => error);
};

export const getTeacherLaboratoryList = (disciplineId, text = '') => (dispatch) => {
  axios({
    url: `Disciplines/LaboratoryWorks/GetLaboratoryListByDisciplineTeacher/${disciplineId}?search=${text}`,
    method: 'GET',
  })
    .then((res) => dispatch(GetStudentLaboratoryListSuccessful(res.data)))
    .catch((error) => error);
};

export default LaboratorySlice.reducer;
