import { SvgIconGuildImageUpload } from '@discord-ui/assets/svgs';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  ImageInput,
  Input,
} from '@discord-ui/components';
import { guildActions, userSelectors } from '@discord-ui/store/store';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

export const CreateGuild: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const formSchema = z.object({
    image: z.instanceof(File).optional(),
    name: z.string().min(1, {
      message: t('common.error.minLength', { name: t('common.password'), size: 1 }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useSelector(userSelectors.selectLoggedInUser);

  const handleFileInput = (file: File): void => {
    form.setValue('image', file);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await dispatch(guildActions.createGuild(form.getValues())).unwrap();
      setIsOpen(false);
      setTimeout(() => {
        form.reset({});
      }, 200);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setValue('name', t('guild.create.defaultName', { name: user?.username }));
  }, []);

  return (
    <Form {...form}>
      <form className="relative">
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogTrigger asChild>
            <div className="w-14 h-14 m-auto mb-3 p-3 cursor-pointer rounded-[100%] group hover:rounded-xl hover:bg-success transition-all duration-300 bg-background">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                className="transition-all duration-300 h-full w-full stroke-success group-hover:stroke-gray-100"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('guild.create.title')}</DialogTitle>
              <DialogDescription>{t('guild.create.descriptio')}</DialogDescription>
            </DialogHeader>
            <div className="w-full flex justify-center">
              <div className="w-24 h-24 cursor-pointer" onClick={() => fileRef.current?.click()}>
                {form.watch('image') ? (
                  <img
                    className="w-full h-ful rounded-full"
                    src={URL.createObjectURL(form.getValues('image')!)}
                  />
                ) : (
                  <img className="w-full h-full" src={SvgIconGuildImageUpload} />
                )}
              </div>
            </div>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        label={t('guild.create.name').toLocaleUpperCase()}
                        errorMessage={error?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="w-full justify-between">
              <Button disabled={loading} variant={'ghost'} onClick={() => setIsOpen(false)}>
                {t('common.back')}
              </Button>
              <Button loading={loading} onClick={form.handleSubmit(onSubmit)}>
                {t('common.create')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <FormField
          control={form.control}
          name="image"
          render={({}) => (
            <FormItem>
              <FormControl>
                <ImageInput
                  title={t('common.imageEdit')}
                  imageType="profileAvatarImage"
                  style={{ display: 'none' }}
                  ref={fileRef}
                  handle={handleFileInput}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
