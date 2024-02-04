import { GeneralLayout } from '@discord-ui/common/layouts/generalLayout/GeneralLayout';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useChannelData } from '../hooks/useChannelData';

export const Channel: React.FC = () => {
  const { t } = useTranslation();
  const { channelId = '', guildId = '' } = useParams<{ channelId: string; guildId: string }>();

  const { channel } = useChannelData({ channelId, guildId });

  return <GeneralLayout channel={channel}>aa</GeneralLayout>;
};
