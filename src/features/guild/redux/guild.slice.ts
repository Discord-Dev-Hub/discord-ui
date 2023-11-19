import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { guildApi } from '../service/api';
import { CreateGuildDto } from '../service/dto/CreateGuildDto';
import { Guild } from '../service/dto/Guild';

const initialState = {
  guilds: [],
};

const guildAdapter = createEntityAdapter<Guild>({
  selectId: (guid) => guid._id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const guildSelectors = guildAdapter.getSelectors();

export const createGuild = createDiscordThunk<Guild, CreateGuildDto, AsyncThunkConfig>(
  'guild/create',
  async (dto) => guildApi.createGuild(dto),
);

export const getGuilds = createDiscordThunk<
  Required<Guild[]>,
  { userId: string },
  AsyncThunkConfig
>('guilds/get', async ({ userId }) => guildApi.getGuilds(userId));

export const getGuildById = createDiscordThunk<
  Required<Guild>,
  { guildId: string },
  AsyncThunkConfig
>('guild/get', async ({ guildId }) => guildApi.getGuildById(guildId));

const guildSlice = createSlice({
  name: 'guild',
  initialState: {
    ...initialState,
    guilds: guildAdapter.getInitialState({ loading: false }),
  },
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getGuilds.fulfilled, (state, action) => {
      guildAdapter.removeAll(state.guilds);
      guildAdapter.setAll(state.guilds, action.payload);
    });
    addCase(createGuild.fulfilled, (state, action) => {
      guildAdapter.upsertOne(state.guilds, action.payload);
    });

    addCase(getGuildById.pending, (state) => {
      state.guilds.loading = true;
    });
    addCase(getGuildById.fulfilled, (state, action) => {
      guildAdapter.upsertOne(state.guilds, action.payload);
      state.guilds.loading = false;
    });
    addCase(getGuildById.rejected, (state) => {
      state.guilds.loading = false;
    });
  },
});

export const guildActions = { ...guildSlice.actions, createGuild, getGuilds, getGuildById };

export default guildSlice.reducer;
