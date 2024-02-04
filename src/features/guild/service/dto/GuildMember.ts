import { User } from '@discord-ui/features/user/service/dto/User';

export interface GuildMember {
  _id: string;
  userId: string;
  guildId: string;
  avatarId: string | null;
  nick?: string;
  user?: User;
}
