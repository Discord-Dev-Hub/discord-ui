import { channelActions, channelSelectors } from '@discord-ui/store/store';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseGetChannelProps {
  guildId: string;
  channelId: string;
  type?: 'auto' | 'manuel';
}

export const useChannelData = ({ channelId, guildId, type = 'auto' }: UseGetChannelProps) => {
  const dispatch = useDispatch();
  const channel = useSelector((s) => channelSelectors.selectChannelById(s, channelId));
  const loading = useSelector(channelSelectors.selectChannelsLoading);

  const getChannelById = useCallback(async () => {
    try {
      await dispatch(channelActions.getChannelById({ channelId, guildId })).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [channelId]);

  useEffect(() => {
    if (type === 'auto') {
      getChannelById();
    }
  }, [type, channelId]);

  return { channel, getChannelById, loading };
};
