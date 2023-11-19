import { userActions } from '@discord-ui/features/user/redux/user.slice';
import { Storage } from '@discord-ui/utils';

import { jwtDecode } from 'jwt-decode';

import { store } from './store';

export const onAppLoad = async () => {
  const dispatch = store.dispatch;

  const token = Storage.get('token');

  if (token) {
    try {
      const { _id: userId } = jwtDecode<{ _id: string }>(token);

      if (!userId) {
        throw new Error('Improper token');
      }

      dispatch(userActions.setToken(token));

      //    await dispatch(userActions.refreshToken(userId)).unwrap();
      await dispatch(userActions.getProfile({ userId })).unwrap();
    } catch (e) {
      //dispatch(userActions.logout());
    }
  }
};
