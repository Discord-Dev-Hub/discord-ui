import { RootState } from '@discord-ui/store/store';
import { createSelector } from '@reduxjs/toolkit';

const testState = (state: RootState) => state.test;

export const selectTest = createSelector(testState, (state) => state.testState);
