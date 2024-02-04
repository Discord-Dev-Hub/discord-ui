import { RootState } from '@discord-ui/store/store';

import { createSelector } from '@reduxjs/toolkit';

const userState = (state: RootState) => state.user;

export const selectLoggedInUserId = createSelector(userState, (state) => state.loggedInUserId);

export const selectLoggedInUser = createSelector(userState, (state) => state.loggedInUser);

export const selectAccessToken = createSelector(userState, (state) => state.accessToken);
