import { createSlice } from '@reduxjs/toolkit';

import { createDiscordThunk } from '../createDiscordThunk';
import { AsyncThunkConfig } from '../store';
import { SocketClient } from './SocketClient';

export const socketConnect = createDiscordThunk<
  void,
  { baseURL: string; token: string },
  AsyncThunkConfig
>('socket/connect', ({ baseURL, token }) => {
  SocketClient.init(baseURL, token);
  return Promise.resolve();
});

export const socketDisconnect = createDiscordThunk<void, void, AsyncThunkConfig>(
  'socket/disconnect',
  () => {
    SocketClient.disconnect();
    return Promise.resolve();
  },
);

type RoomSearcProps = {};

export type ChatReducer = {};

const initialState: ChatReducer = {
  roomSearch: { query: '', type: undefined, rooms: [] },
  selectedRoomId: '',
  chatNotifications: { unreadMessages: [] },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    ...initialState,
  },
  reducers: {},
});

export const chatActions = {
  ...chatSlice.actions,
  socketConnect,
  socketDisconnect,
};

export default chatSlice.reducer;
