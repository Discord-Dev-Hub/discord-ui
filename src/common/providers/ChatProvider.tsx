import { chatActions, userSelectors } from '@discord-ui/store/store';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ChatProvider: React.FC<{ baseURL: string; children: React.ReactNode }> = ({
  baseURL,
  children,
}) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(userSelectors.selectLoggedInUser);

  const accessToken = useSelector(userSelectors.selectAccessToken);

  useEffect(() => {
    if (loggedIn?._id && accessToken) {
      dispatch(chatActions.socketConnect({ baseURL, token: accessToken }));
    }
    if (!loggedIn?._id || !accessToken) {
      dispatch(chatActions.socketDisconnect());
    }
  }, [dispatch, accessToken, baseURL, loggedIn?._id]);

  return <>{children}</>;
};
