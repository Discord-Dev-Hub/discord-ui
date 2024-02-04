import { Input } from '@discord-ui/components';
import { Channel } from '@discord-ui/features/channel/service/dto/Channel';
import { guildActions, guildSelectors } from '@discord-ui/store/store';
import { cn } from '@discord-ui/utils';

import React, { useEffect, useState } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GuildMember } from './GuildMember';

export const GeneralLayout: React.FC<{ channel: Channel; children: React.ReactNode }> = ({
  channel,
  children,
}) => {
  const dispatch = useDispatch();
  const [showMembers, setShowMembers] = useState(true);

  const { guildId } = useParams<{ channelId: string; guildId: string }>();

  const guildMembers = useSelector((s) => guildSelectors.selectGuildByIdMembers(s, guildId!));

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (guildId) {
          await dispatch(guildActions.getGuildMembers({ guildId })).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [guildId]);

  return (
    <div className="flex flex-col w-full h-full bg-overlayChat">
      <div className="flex w-full h-[3.05rem] border-b border-gray-900 p-4 items-center justify-between ">
        <p className="text-gray-50 font-bold">{channel?.name}</p>

        <div className="cursor-pointer" onClick={() => setShowMembers((prev) => !prev)}>
          <MdPeopleAlt size={24} color={showMembers ? '#fff' : '#bfbfbf'} />
        </div>
      </div>
      <div className="flex flex-auto h-full w-full">
        <div className="flex flex-col h-full w-full">
          <div className="h-full w-full overflow-auto">{children}</div>
          <div className="w-full mb-6 border-gray-900 px-5 items-center">
            <Input className="bg-zinc-500 min-h-[3rem] bg-opacity-10 rounded-md" />
          </div>
        </div>

        <div
          className={cn(
            `h-full min-w-[15rem] ${
              showMembers ? 'w-60 p-2' : 'w-0 min-w-0'
            } transition-all duration-500 overflow-auto overflow-x-hidden bg-background`,
          )}
        >
          {guildMembers.map((member, i) => (
            <GuildMember key={`member-${member._id}-${i}`} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};
