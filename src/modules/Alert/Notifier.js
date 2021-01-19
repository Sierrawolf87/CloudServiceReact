import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { RemoveNotification } from './AlertSlice';

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((store) => store.alert.notifications || []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(({
      key, message, options, action,
    }) => {
      if (displayed.includes(key)) return;

      enqueueSnackbar(message, {
        key,
        ...options,
        ...action,
        onExited: (event, myKey) => {
          dispatch(RemoveNotification(myKey));
          removeDisplayed(myKey);
        },
      });

      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
