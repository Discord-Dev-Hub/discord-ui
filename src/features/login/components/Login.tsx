import { SvgIconDiscordText, SvgLoginBackground } from '@discord-ui/assets/svgs';
import { Button, Form, FormControl, FormField, FormItem, Input } from '@discord-ui/components';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { loginActions } from '../redux/login.slice';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: t('common.error.minLength', { name: t('common.password'), size: 8 }),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const onSubmit = async () => {
    try {
      await dispatch(loginActions.login(form.getValues())).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full relative">
        <img src={SvgLoginBackground} className="absolute w-full h-full" />
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col max-w-full h-full sm:h-auto sm:max-w-3xl w-full bg-background sm:rounded-lg p-5 sm:p-10 z-10 relative sm:m-8 ">
            <div className="flex flex-col gap-5">
              <img src={SvgIconDiscordText} className="sm:hidden h-10 mt-6 my-4" />
              <div>
                <h1 className="text-2xl font-semibold text-center leading-tight">
                  {t('login.title')}
                </h1>
                <p className="text-base font-light text-center text-text-gray">
                  {t('login.description')}
                </p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <Input label={t('common.email')} errorMessage={error?.message} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label={t('common.password')}
                        type="password"
                        errorMessage={error?.message}
                        {...field}
                      />
                    </FormControl>

                    <Link to="#" className="font-medium text-xs">
                      {t('common.forgotPassword')}
                    </Link>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Button type="submit" size={'lg'}>
                  {t('common.logIn')}
                </Button>
                <p className="text-text-gray font-medium text-xs">
                  {t('login.register')} <Link to="/register">{t('common.register')}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
