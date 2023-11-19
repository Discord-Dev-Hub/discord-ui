import { channelActions, guildSelectors } from '@discord-ui/store/store';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { guildActions } from '../redux/guild.slice';

interface UseGetGuildProps {
  guildId: string;
  type?: 'auto' | 'manuel';
}

export const useGuildData = ({ guildId, type = 'auto' }: UseGetGuildProps) => {
  const dispatch = useDispatch();
  const guild = useSelector((s) => guildSelectors.selectGuildById(s, guildId));
  const loading = useSelector(guildSelectors.selectGuildLoading);

  const getGuildById = useCallback(async () => {
    try {
      await dispatch(guildActions.getGuildById({ guildId })).unwrap();
      await dispatch(channelActions.getGuildChannels({ guildId })).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [guildId]);

  useEffect(() => {
    if (type === 'auto') {
      getGuildById();
    }
  }, [type, guildId]);

  return { guild, getGuildById, loading };
};
