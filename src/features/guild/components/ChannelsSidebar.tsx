import { SvgIconDropDown } from '@discord-ui/assets/svgs';
import { LineSection, Popover, PopoverContent, PopoverTrigger } from '@discord-ui/components';
import { DiscordRoutesEnum } from '@discord-ui/routes/route-decorators/DiscordRoutesEnum';
import { channelSelectors } from '@discord-ui/store/store';

import { FrameIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import { useGuildData } from '../hooks/useGuildData';
import { CreateChannel } from './CreateChannel';
import { SettingSection } from './SettingSection';

export const ChannelsSidebar: React.FC = () => {
  const { guildId = '' } = useParams<{ guildId: string }>();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { guild } = useGuildData({ guildId });

  const [createChannelModal, setCreateChannelModal] = useState(false);

  const channels = useSelector((s) => channelSelectors.selectGuildByIdChannels(s, guildId));

  const settings = [
    { name: t('guild.settings.guildSettings') },
    { name: t('guild.settings.createChannel'), onOpen: () => setCreateChannelModal(true) },
  ];

  if (!guild) {
    return <div className="w-60" />;
  }

  return (
    <div className="flex flex-col w-60">
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer px-4 py-3 w-full bg-background hover:bg-backgroundOverlaySelected transition-all duration-200 shadow-sm shadow-zinc-900">
            <div className="flex w-full gap-1 items-center">
              <p className="text-start font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {guild.name}
              </p>

              <img src={SvgIconDropDown} className="w-3 h-3" />
            </div>
          </div>
        </PopoverTrigger>

        <div className="flex flex-col gap-1 pt-3 overflow-auto">
          {channels.map((channel, i) => (
            <Link
              key={`channel-${channel._id}-${i}`}
              className="w-full px-3 hover:no-underline"
              to={`${DiscordRoutesEnum.channels}/${guildId}/${channel._id}`}
            >
              <LineSection
                title={channel.name}
                active={pathname.includes(channel._id)}
                className="gap-2"
                topChildren={<FrameIcon className="h-5 w-5" color="#bfbfbf" />}
              />
            </Link>
          ))}
        </div>
        <PopoverContent className="w-56 p-3">
          <div className="w-full flex flex-col gap-[0.12rem]">
            {settings.map((setting, i) => (
              <SettingSection key={`${setting.name}-${i}`} {...setting} />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <CreateChannel guild={guild} isOpen={createChannelModal} setIsOpen={setCreateChannelModal} />
    </div>
  );
};
