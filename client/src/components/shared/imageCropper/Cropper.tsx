import {useCallback, useState} from 'react';
import Cropper, {Area} from 'react-easy-crop';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import getCroppedImage from '@/utils/getCroppedImage';
import {CropperProps} from '@/interfaces/profile';

const ImageCropper = ({
  imageSrc,
  setCroppedImage,
  setIsFormOpen,
}: CropperProps) => {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const {file, url} = await getCroppedImage(imageSrc, croppedAreaPixels);
      setCroppedImage([url, file]);
      setIsFormOpen(false);
    }
  };

  return (
    <>
      <div className='relative w-[200px] h-[200px] bg-gray-200'>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape='round'
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className='flex gap-8'>
        <PrimaryButton
          buttonText='Cancel'
          handleClick={() => setIsFormOpen(false)}
          variant={'outline'}
          className='rounded-sm'
        />
        <PrimaryButton
          buttonText='Save'
          handleClick={handleSave}
          className='rounded-sm hover:bg-accent'
        />
      </div>
    </>
  );
};

export default ImageCropper;
