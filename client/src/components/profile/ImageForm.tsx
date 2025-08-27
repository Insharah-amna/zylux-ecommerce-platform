import {useState, useCallback} from 'react';
import Cropper, {Area} from 'react-easy-crop';
import {ImageFormProps} from '@/interfaces/profile';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import getCroppedImage from '@/utils/getCroppedImage';

const ImageForm = ({setIsFormOpen, setCroppedImage}: ImageFormProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const {file, url} = await getCroppedImage(imageSrc, croppedAreaPixels);
      setCroppedImage(url);
      setIsFormOpen(false);
    }
  };

  return (
    <div className='flex-center flex-col justify-between h-[460px] py-4 relative'>
      <input
        type='file'
        accept='image/*'
        onChange={onFileChange}
        className='block text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100'
      />

      {imageSrc ? (
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
      ) : (
        <PrimaryButton
          buttonText='Cancel'
          handleClick={() => setIsFormOpen(false)}
          variant={'outline'}
          className='absolute bottom-8'
        />
      )}
    </div>
  );
};

export default ImageForm;
