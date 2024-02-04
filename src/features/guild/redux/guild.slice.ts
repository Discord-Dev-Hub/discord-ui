import { acceptJoinGuild } from '@discord-ui/features/invite/redux/invite.slice';
import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';

import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { guildApi } from '../service/api';
import { CreateGuildDto } from '../service/dto/CreateGuildDto';
import { Guild } from '../service/dto/Guild';
import { GuildMember } from '../service/dto/GuildMember';

export interface GuildMemberReduxEntry {
  guildId: string;
  members: GuildMember[];
}

const initialState = {
  guilds: [],
};

const guildAdapter = createEntityAdapter<Guild>({
  selectId: (guid) => guid._id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const guildMemberAdapter = createEntityAdapter<GuildMemberReduxEntry>({
  selectId: (member) => member.guildId,
});

export const guildMemberSelectors = guildMemberAdapter.getSelectors();

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

export const getGuildMembers = createDiscordThunk<
  GuildMember[],
  { guildId: string },
  AsyncThunkConfig
>('guild/members', async ({ guildId }) => guildApi.getGuildMembers(guildId));

const guildSlice = createSlice({
  name: 'guild',
  initialState: {
    ...initialState,
    guilds: guildAdapter.getInitialState({ loading: false }),
    members: guildMemberAdapter.getInitialState({ loading: false }),
  },
  reducers: {},
  extraReducers: ({ addCase, addMatcher }) => {
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

    addCase(getGuildById.rejected, (state) => {
      state.guilds.loading = false;
    });

    addCase(getGuildMembers.pending, (state) => {
      state.members.loading = true;
    });
    addCase(getGuildMembers.fulfilled, (state, action) => {
      const guildId = action.meta.arg.guildId;
      const members = action.payload;

      guildMemberAdapter.upsertOne(state.members, { guildId, members });

      state.members.loading = false;
    });
    addCase(getGuildMembers.rejected, (state) => {
      state.members.loading = false;
    });

    addMatcher(isAnyOf(getGuildById.fulfilled, acceptJoinGuild.fulfilled), (state, action) => {
      guildAdapter.upsertOne(state.guilds, action.payload);
      state.guilds.loading = false;
    });
  },
});

export const guildActions = {
  ...guildSlice.actions,
  createGuild,
  getGuilds,
  getGuildById,
  getGuildMembers,
};

export default guildSlice.reducer;
