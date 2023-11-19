import { discordApiClient } from '@discord-ui/discord-api-client';
import { login } from '@discord-ui/features/login/redux/login.slice';
import { register } from '@discord-ui/features/register/redux/register.slice';
import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';
import { Storage } from '@discord-ui/utils';

import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { userApi } from '../service/api';
import { User } from '../service/dto/User';

interface UserSliceInitialState {
  accessToken?: string;
  loggedInUserId?: string;
  loggedInUser?: User;
}

const initialState: UserSliceInitialState = {
  accessToken: undefined,
  loggedInUserId: undefined,
  loggedInUser: undefined,
};

export const getProfile = createDiscordThunk<Required<User>, { userId: string }, AsyncThunkConfig>(
  'user/profile/get',
  async ({ userId }) => userApi.getProfile(userId),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      try {
        const token = action.payload;
        const data = jwtDecode(token) as { _id?: string };

        if (data?._id) {
          discordApiClient.updateToken(token);
          state.accessToken = token;
          state.loggedInUserId = data._id;

          Storage.set('token', token);
        }
      } catch (e) {
        console.error('Failed to recover the access token', e);
        throw e;
      }
    },
  },
  extraReducers: ({ addCase, addMatcher }) => {
    addCase(getProfile.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });

    addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action) => {
      Storage.set('token', action.payload.accessToken);
      state.loggedInUserId = action.payload.profile.id;
      state.loggedInUser = action.payload.profile;
      discordApiClient.updateToken(action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
    });
  },
});

export const userActions = { ...userSlice.actions, getProfile };

export default userSlice.reducer;
