import { SvgIconDiscord } from '@discord-ui/assets/svgs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  LineSection,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@discord-ui/components';
import { discordApiClient } from '@discord-ui/discord-api-client';
import { GuildMember as GuildMemberModel } from '@discord-ui/features/guild/service/dto/GuildMember';
import { PresenceStatus } from '@discord-ui/features/user/constants/PresenceStatus';
import { cn } from '@discord-ui/utils';

import React from 'react';

export const GuildMember: React.FC<{ member: GuildMemberModel }> = ({ member }) => {
  const { avatarId, nick, user } = member || {};

  const name = nick || user?.displayName || user?.username;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <div className="w-full flex justify-center relative">
          <TooltipTrigger className="group w-full">
            <LineSection
              title={name!}
              titleClassname={'font-semibold text-base'}
              className="gap-2"
              topChildren={
                <div className="relative">
                  <Avatar className={`w-8 h-8 shadow-lg cursor-pointer bg-secondaryBackground`}>
                    <AvatarImage
                      src={discordApiClient.media.getMedia(avatarId) || SvgIconDiscord}
                      alt={`${name}-image`}
                    />
                    <AvatarFallback className="text-2xl text-gray-100">{name}</AvatarFallback>
                  </Avatar>

                  <div
                    className={cn(
                      `absolute bottom-[-0.10rem] right-[-0.10rem] w-3 h-3 rounded-full z-30`,
                      user?.online === PresenceStatus.online ? 'bg-green-500' : 'bg-gray-600',
                    )}
                  />
                </div>
              }
            />
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
