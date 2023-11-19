import { RootState } from '@discord-ui/store/store';

import { createSelector } from '@reduxjs/toolkit';

import { guildSelectors } from './guild.slice';

const guildState = (state: RootState) => state.guild;

export const selectGuilds = createSelector(guildState, (state) =>
  guildSelectors.selectAll(state.guilds),
);

export const selectGuildLoading = createSelector(guildState, (state) => state.guilds.loading);

export const selectGuildById = createSelector(
  [guildState, (_, guildId: string) => guildId],
  (state, guildId) => guildSelectors.selectById(state.guilds, guildId),
);
