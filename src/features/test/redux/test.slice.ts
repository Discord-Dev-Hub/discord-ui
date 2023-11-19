import { createSlice } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '@discord-ui/store/store';
import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';

interface GifSliceInitialState {
  testState: any;
}

const initialState: GifSliceInitialState = {
  testState: { locale: 'en', tags: [] },
};

const test = createDiscordThunk<any, void, AsyncThunkConfig>('/test/categories', async () => {
  return '';
});

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(test.fulfilled, (state, action) => {
      state.testState = action.payload;
    });
  },
});

export const testActions = {
  test,
};

export default testSlice.reducer;
