import { RootState } from '@discord-ui/store/store';

import { createSelector } from '@reduxjs/toolkit';

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
  (state, channelId) => channelSelectors.selectById(state.channels, channelId),
);
