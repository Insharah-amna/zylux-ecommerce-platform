import {useState} from 'react';
import {ImageFormProps} from '@/interfaces/profile';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import ImageCropper from '@/components/shared/imageCropper/Cropper';

const ImageForm = ({setIsFormOpen, setCroppedImage}: ImageFormProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
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
        <ImageCropper
          imageSrc={imageSrc}
          setCroppedImage={setCroppedImage}
          setIsFormOpen={setIsFormOpen}
        />
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
