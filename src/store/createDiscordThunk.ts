import { AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from './store';

export function createDiscordThunk<ReturnType, ThunkArg, ThunkApiConfig extends AsyncThunkConfig>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<ReturnType, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>,
) {
  return createAsyncThunk<ReturnType, ThunkArg, AsyncThunkConfig>(typePrefix, payloadCreator, {
    serializeError: (e) => e as any,
    ...options,
  });
}
