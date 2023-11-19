import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@discord-ui/components';
import { discordApiClient } from '@discord-ui/discord-api-client';
import { Guild } from '@discord-ui/features/guild/service/dto/Guild';
import { DiscordRoutesEnum } from '@discord-ui/routes/route-decorators/DiscordRoutesEnum';
import { cn } from '@discord-ui/utils';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const GuildAvatar: React.FC<{ guild: Guild }> = ({ guild }) => {
  const { pathname } = useLocation();

  const { _id, name, mediaId } = guild;

  const selectedGuild = pathname.includes(_id);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <div className="w-full flex justify-center relative">
          <TooltipTrigger className="group">
            <div
              className={cn(
                `absolute transition-all duration-300 -left-0.5 h-0 w-0 bg-white top-2/4 -translate-y-1/2 rounded-r pointer-events-none`,
                selectedGuild ? 'h-3/4 w-1.5' : 'group-hover:h-2/5 group-hover:w-1.5',
              )}
            ></div>
            <Link className="hover:no-underline" to={`${DiscordRoutesEnum.channels}/${_id}`}>
              <Avatar
                className={`w-14 h-14 m-auto shadow-lg cursor-pointer ${
                  selectedGuild ? 'rounded-xl' : ''
                } hover:rounded-xl transition-all duration-300 bg-background`}
              >
                <AvatarImage src={discordApiClient.media.getMedia(mediaId)} alt="discord" />
                <AvatarFallback className="text-2xl text-gray-100">{name[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>
        </div>

        <TooltipContent sideOffset={15} className="max-w-[12.7rem]">
          <p>{name}</p>
          <TooltipArrow width={'0.7rem'} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
