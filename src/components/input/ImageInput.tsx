import { cn } from '@discord-ui/utils';

import React, { useCallback, useState } from 'react';
import Cropper, { Area, MediaSize } from 'react-easy-crop';

import { Button } from '../button/Button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../dialog/Dialog';
import { Input } from './Input';
import getCroppedImg from './crop/getCroppending';
import { imagaTypes } from './crop/utils';

export type ImageInputProps = {
  title?: string;
  handle: (file: File) => void;
  imageType: 'profileAvatarImage' | 'profileBannerImage' | 'postImage';
  filesType?: 'image/*' | 'video/*' | 'image/*, video/*' | '*';
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as'>;

export const ImageInput = React.forwardRef<HTMLInputElement, ImageInputProps>(
  ({ handle, title, imageType, filesType = 'image/*', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [fileName, setFileName] = useState<string>();
    const [zoom, setZoom] = useState(1);
    const [minZoom, setMinZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const imageFeatures = imagaTypes[imageType];

    const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        setFileName(file.name);

        if (file.type.startsWith('video/')) {
          handle(file);
          return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          if (reader.result) {
            setImgSrc(reader.result.toString() || '');
            setIsOpen(true);
          }
        });
        reader.readAsDataURL(file);
      }
    }, []);

    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
      const { width, height } = mediaSize;
      const mediaAspectRadio = width / height;

      if (mediaAspectRadio > imageFeatures.aspect) {
        const result = imageFeatures.width / imageFeatures.aspect / height;

        setZoom(result);
        setMinZoom(result);
        return;
      }

      const result = imageFeatures.width / width;
      setZoom(result);
      setMinZoom(result);
    }, []);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
      if (!croppedAreaPixels) return;
      try {
        const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels, fileName);
        handle(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }, [croppedAreaPixels, imgSrc, handle, fileName]);

    return (
      <div className="flex flex-col items-stretch w-full">
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogContent className="max-w-xl">
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            <div
              className={cn(
                `w-full h-full ${isOpen ? 'flex' : 'hidden'} justify-center items-center z-50`,
              )}
            >
              <div
                className={
                  'rounded-xl w-full h-full flex flex-col justify-center items-center max-w-[55rem]'
                }
              >
                <div className="flex justify-center items-center w-full h-full rounded-b-xl bg-[#2c2c2c]">
                  <div className="h-[28.5rem] w-full rounded-t-xl bg-[#20142c65] relative">
                    <Cropper
                      image={imgSrc}
                      crop={crop}
                      zoom={zoom}
                      minZoom={minZoom}
                      maxZoom={minZoom + 3}
                      aspect={imageFeatures.aspect}
                      cropShape={imageFeatures.round ? 'round' : 'rect'}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      cropSize={{
                        width: imageFeatures.width,
                        height: imageFeatures.width / imageFeatures.aspect,
                      }}
                      style={{
                        cropAreaStyle: {
                          border: '0.40rem solid #fff',
                        },
                      }}
                      onMediaLoaded={onMediaLoaded}
                      showGrid={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Input
              label=""
              type="range"
              value={zoom}
              min={minZoom}
              max={minZoom + 3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(Number(e.target.value));
              }}
            />

            <DialogFooter className="w-full justify-between">
              <Button variant={'ghost'} onClick={() => setIsOpen(false)}>
                Geri
              </Button>
              <Button
                className="w-28"
                onClick={(e) => {
                  e.preventDefault();
                  showCroppedImage();
                  setIsOpen(false);
                }}
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!isOpen && (
          <Input type="file" accept={filesType} ref={ref} onChange={onFileChange} {...props} />
        )}
      </div>
    );
  },
);
