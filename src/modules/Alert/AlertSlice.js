import { createSlice } from '@reduxjs/toolkit';

export const AlertSlice = createSlice({
  name: 'alert',
  initialState: {
    notifications: [],
  },
  reducers: {
    AddNotification: (state, action) => {
      state.notifications = [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: action.payload.options,
          action: action.payload.options,
        },
      ];
    },
    RemoveNotification: (state, action) => {
      state.notifications = [...state.notifications.filter((item) => item.key !== action.payload)];
    },
    ClearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  AddNotification, RemoveNotification, ClearNotifications,
} = AlertSlice.actions;

export const ShowNotification = (message = '', variant = 'default', option = {}, action = {}) => (dispatch) => {
  if (message !== '') {
    dispatch(AddNotification(
      {
        key: new Date().getTime() + Math.random(),
        message,
        options: {
          variant,
          ...option,
        },
        action,
      },
    ));
  }
};

export default AlertSlice.reducer;
