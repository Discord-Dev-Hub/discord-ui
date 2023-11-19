import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  LineSection,
  RadioGroup,
  RadioGroupItem,
} from '@discord-ui/components';
import { ChannelTypes } from '@discord-ui/features/channel/service/constants/ChannelTypes';
import { DiscordRoutesEnum } from '@discord-ui/routes/route-decorators/DiscordRoutesEnum';
import { channelActions } from '@discord-ui/store/store';
import { replaceNonAlphanumeric } from '@discord-ui/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { FrameIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Guild } from '../service/dto/Guild';

export const CreateChannel: React.FC<{
  guild: Guild;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ guild, isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    type: z.nativeEnum(ChannelTypes),
    name: z
      .string()
      .min(1, {
        message: t('common.error.minLength', { name: t('common.channel.name'), size: 1 }),
      })
      .max(32, {
        message: t('common.error.maxLength', { name: t('common.channel.name'), size: 32 }),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const channel = await dispatch(
        channelActions.createChannel({ dto: form.getValues(), guildId: guild._id }),
      ).unwrap();
      setIsOpen(false);
      setTimeout(() => {
        form.reset({});
      }, 200);
      navigate(`${DiscordRoutesEnum.channels}/${guild._id}/${channel._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setValue('type', ChannelTypes.TEXT);
    form.resetField('name');
  }, []);

  return (
    <Form {...form}>
      <form className="relative">
        <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
          <DialogContent>
            <DialogHeader className="text-start">
              <DialogTitle className="text-2xl">{t('guild.settings.createChannel')}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <RadioGroup defaultValue={value}>
                    <FormLabel className="uppercase text-sm font-extrabold text-zinc-400">
                      {t('common.create.type')}
                    </FormLabel>
                    <LineSection
                      as="label"
                      title="Text"
                      onClick={() => onChange(ChannelTypes.TEXT)}
                      active={value === ChannelTypes.TEXT}
                      description={t('channel.create.textDescription')}
                      topChildren={<FrameIcon className="h-6 w-6" />}
                      footerChildren={
                        <RadioGroupItem
                          checked={value === ChannelTypes.TEXT}
                          value={ChannelTypes.TEXT}
                        />
                      }
                      className="bg-zinc-800"
                    />
                    <LineSection
                      as="label"
                      title="Voice"
                      onClick={() => onChange(ChannelTypes.VOICE)}
                      active={value === ChannelTypes.VOICE}
                      description={t('channel.create.voiceDescription')}
                      topChildren={<FrameIcon className="h-6 w-6" />}
                      footerChildren={
                        <RadioGroupItem
                          checked={value === ChannelTypes.VOICE}
                          value={ChannelTypes.VOICE}
                        />
                      }
                      className="bg-zinc-800"
                      aria-checked={'false'}
                    />
                  </RadioGroup>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        placeholder={t('channel.create.placeholder')}
                        label={t('common.channel.name').toLocaleUpperCase()}
                        errorMessage={error?.message}
                        {...field}
                        onChange={(e) => field.onChange(replaceNonAlphanumeric(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="w-full justify-between">
              <Button variant={'ghost'} onClick={() => setIsOpen(false)}>
                {t('common.back')}
              </Button>
              <Button loading={loading} onClick={form.handleSubmit(onSubmit)}>
                {t('common.create')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
