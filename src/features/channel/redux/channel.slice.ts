import { createDiscordThunk } from '@discord-ui/store/createDiscordThunk';
import { AsyncThunkConfig } from '@discord-ui/store/store';

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { cloneDeep, findIndex, sortedIndexBy } from 'lodash';

import { channelApi } from '../service/api';
import { Channel } from '../service/dto/Channel';
import { CreateChannelDto } from '../service/dto/CreateChannelDto';

const initialState = {
  channels: [],
};

export interface ChannelReduxEntry {
  guildId: string;
  channels: Channel[];
}

const channelAdapter = createEntityAdapter<ChannelReduxEntry>({
  selectId: (channel) => channel.guildId,
});

export const channelSelectors = channelAdapter.getSelectors();

export const createChannel = createDiscordThunk<
  Channel,
  { dto: CreateChannelDto; guildId: string },
  AsyncThunkConfig
>('channel/create', async ({ dto, guildId }) => channelApi.createChannel(guildId, dto));

export const getGuildChannels = createDiscordThunk<
  Channel[],
  { guildId: string },
  AsyncThunkConfig
>('channels/get', async ({ guildId }) => channelApi.getGuildChannels(guildId));

export const getChannelById = createDiscordThunk<
  Channel,
  { guildId: string; channelId: string },
  AsyncThunkConfig
>('channel/get', async ({ guildId, channelId }) => channelApi.getChannelById(guildId, channelId));

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    ...initialState,
    channels: channelAdapter.getInitialState({ loading: false }),
  },
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(createChannel.fulfilled, (state, action) => {
      const guildId = action.meta.arg.guildId;

      const storedEntity = channelSelectors.selectById(state.channels, guildId)?.channels || [];

      channelAdapter.upsertOne(state.channels, {
        channels: [...storedEntity, action.payload],
        guildId,
      });
    });

    addCase(getChannelById.pending, (state) => {
      state.channels.loading = true;
    });
    addCase(getChannelById.fulfilled, (state, action) => {
      const { channelId, guildId } = action.meta.arg;

      const storedEntity = channelSelectors.selectById(state.channels, guildId)?.channels || [];
      const channels = cloneDeep(storedEntity);
      const index = findIndex(channels, { _id: channelId });

      if (index !== -1) {
        channels.splice(index, 1)[0];
        const newIndex = sortedIndexBy(channels, action.payload, '_id');
        channels.splice(newIndex, 0, action.payload);
      }
      channelAdapter.upsertOne(state.channels, { channels, guildId });
      state.channels.loading = false;
    });
    addCase(getChannelById.rejected, (state) => {
      state.channels.loading = false;
    });

    addCase(getGuildChannels.pending, (state) => {
      state.channels.loading = true;
    });
    addCase(getGuildChannels.fulfilled, (state, action) => {
      const guildId = action.meta.arg.guildId;
      const channels = action.payload;

      channelAdapter.upsertOne(state.channels, { guildId, channels });

      state.channels.loading = false;
    });
    addCase(getGuildChannels.rejected, (state) => {
      state.channels.loading = false;
    });
  },
});

export const channelActions = {
  ...channelSlice.actions,
  createChannel,
  getGuildChannels,
  getChannelById,
};

export default channelSlice.reducer;
