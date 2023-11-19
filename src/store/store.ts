import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import channel, { channelActions } from '../features/channel/redux/channel.slice';
import guild, { guildActions } from '../features/guild/redux/guild.slice';
import { loginActions } from '../features/login/redux/login.slice';
import { registerActions } from '../features/register/redux/register.slice';
import test, { testActions } from '../features/test/redux/test.slice';
import user, { userActions } from '../features/user/redux/user.slice';

export { testActions, userActions, registerActions, loginActions, guildActions, channelActions };

export * as testSelectors from '../features/test/redux/test.selectors';
export * as userSelectors from '../features/user/redux/user.selectors';
export * as guildSelectors from '../features/guild/redux/guild.selectors';
export * as channelSelectors from '../features/channel/redux/channel.selectors';

const reducer = combineReducers({
  test,
  user,
  channel,
  guild,
});

export type RootState = ReturnType<typeof reducer>;

export type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({ immutableCheck: false, serializableCheck: false }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
