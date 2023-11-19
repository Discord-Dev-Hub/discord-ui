import { SvgIconDiscordText, SvgLoginBackground } from '@discord-ui/assets/svgs';
import {
  Button,
  Calendar,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@discord-ui/components';
import { cn } from '@discord-ui/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { registerActions } from '../redux/register.slice';

export const Register: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: t('common.error.minLength', { name: t('common.password'), size: 8 }),
    }),
    dateOfBirth: z.date({
      required_error: 'A date of birth is required.',
    }),
    displayName: z
      .string()
      .min(8, {
        message: t('common.error.minLength', { name: t('common.displayName'), size: 8 }),
      })
      .optional(),
    username: z.string().min(8, {
      message: t('common.error.minLength', { name: t('common.username'), size: 8 }),
    }),
    isRead: z.boolean().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const onSubmit = async () => {
    const { dateOfBirth, email, password, username, displayName } = form.getValues();

    try {
      await dispatch(
        registerActions.register({ dateOfBirth, email, password, username, displayName }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const fields: { name: keyof z.infer<typeof formSchema>; type?: string }[] = [
    { name: 'email' },
    { name: 'displayName' },
    { name: 'username' },
    { name: 'password', type: 'password' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full relative">
        <img src={SvgLoginBackground} className="absolute w-full h-full" />
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col max-w-full h-full sm:h-auto sm:max-w-[33rem] w-full bg-background sm:rounded-lg p-5 sm:p-10 z-10 relative sm:m-8 ">
            <div className="flex flex-col gap-5">
              <img src={SvgIconDiscordText} className="sm:hidden h-10 mt-6 my-4" />

              <h1 className="text-2xl font-semibold text-center leading-tight">
                {t('register.title')}
              </h1>

              {fields.map(({ name, type }, i) => (
                <FormField
                  key={`${name}-${i}`}
                  control={form.control}
                  name={name}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label={t(`common.${name}`)}
                          type={type || 'text'}
                          errorMessage={error?.message}
                          {...(field as any)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'max-w-[240px] w-full pl-3 text-left font-normal text-lg bg-secondaryBackground border-none hover:bg-black',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span className="text-base">{t('common.dateOfBirth')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={'isRead'}
                render={() => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      onClick={(e) =>
                        form.setValue('isRead', !JSON.parse(e.currentTarget.ariaChecked || 'false'))
                      }
                    />
                    <label htmlFor="terms" className="text-xs text-text-gray font-medium">
                      <Trans
                        i18nKey="register.description"
                        components={{
                          link1: <Link to={'https://discord.com/terms'} target="_blank" />,
                          link2: <Link to={'https://discord.com/privacy'} target="_blank" />,
                        }}
                      />
                    </label>
                  </div>
                )}
              />

              <div className="flex flex-col gap-2 ">
                <Button type="submit" size={'lg'} disabled={!form.watch('isRead')}>
                  {t('common.contiune')}
                </Button>

                <Link to="/login" className="text-xs font-medium">
                  {t('register.alreadyAcount')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
