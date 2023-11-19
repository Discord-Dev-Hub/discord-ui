import { SvgIconDiscord } from '@discord-ui/assets/svgs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@discord-ui/components';
import { guildActions, guildSelectors, userSelectors } from '@discord-ui/store/store';
import { cn } from '@discord-ui/utils';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { CreateGuild } from './CreateGuild';
import { GuildAvatar } from './GuildAvatar';

export const GuildsSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const loggedInUser = useSelector(userSelectors.selectLoggedInUser);
  const guilds = useSelector(guildSelectors.selectGuilds);

  useEffect(() => {
    const getGuilds = async () => {
      try {
        if (loggedInUser?._id) {
          await dispatch(guildActions.getGuilds({ userId: loggedInUser._id })).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getGuilds();
  }, [loggedInUser?._id]);

  return (
    <div className="w-20 min-w-[5rem] h-full bg-secondaryBackground justify-center overflow-auto scrollbar-none">
      <div className="h-15 w-15 justify-center border-b-4 border-background m-3 pb-1">
        <Link className="hover:no-underline" to={`/channels/@me`}>
          <Avatar
            className={cn(
              'w-full h-full m-auto my-2 p-3 cursor-pointer hover:rounded-xl hover:bg-buttonPrimary transition-all duration-300 bg-background',
              pathname.includes('@me') && 'rounded-xl bg-buttonPrimary',
            )}
          >
            <AvatarImage src={SvgIconDiscord} alt="discord" />
            <AvatarFallback>Discord</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="flex flex-col gap-3 w-full items-center overflow-auto">
        {guilds.map((guild, index) => (
          <GuildAvatar key={`guild-${guild._id}-${index}`} guild={guild} />
        ))}

        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <CreateGuild />
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="max-w-[12.7rem]">
              <p>{t('common.createGuild')}</p>
              <TooltipArrow width={'0.7rem'} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
