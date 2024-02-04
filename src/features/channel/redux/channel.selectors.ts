import { RootState } from '@discord-ui/store/store';

import { createSelector } from '@reduxjs/toolkit';
import { chain } from 'lodash';

import { channelSelectors } from './channel.slice';

const channelState = (state: RootState) => state.channel;

export const selectGuildByIdChannels = createSelector(
  [channelState, (_, guildId: string) => guildId],
  (state, guildId) => channelSelectors.selectById(state.channels, guildId)?.channels || [],
);

export const selectChannelsLoading = createSelector(
  channelState,
  (state) => state.channels.loading,
);

export const selectChannelById = createSelector(
  [channelState, (_, channelId: string) => channelId],
  (state, channelId) => {
    const channel = chain(channelSelectors.selectAll(state.channels))
      .map('channels')
      .flatten()
      .find({ _id: channelId })
      .value();

    return channel;
  },
);
