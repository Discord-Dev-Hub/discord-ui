import { SvgIconEmptyChannel } from '@discord-ui/assets/svgs';

import { useTranslation } from 'react-i18next';

import { GuildLayout } from '../layouts/GuildLayout';

export const Guild: React.FC = () => {
  const { t } = useTranslation();

  return (
    <GuildLayout>
      <div className="flex justify-center items-center h-full w- w-[calc(100%_-_15rem)] bg-[#1e1f22]">
        <div className="flex flex-col gap-8 items-center m-auto p-2">
          <img src={SvgIconEmptyChannel} className="w-72 h-60" />
          <div className="flex flex-col gap-1 items-center max-w-md w-full text-center">
            <h1 className="text-base font-bold uppercase text-gray-400">
              {t('channel.empty.title')}
            </h1>
            <p className="text-base font-normal text-gray-400">{t('channel.empty.description')}</p>
          </div>
        </div>
      </div>
    </GuildLayout>
  );
};
