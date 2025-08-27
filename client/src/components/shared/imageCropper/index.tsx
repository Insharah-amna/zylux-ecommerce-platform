import Image from 'next/image';
import {useState} from 'react';
import {ImageCropperProps} from '@/interfaces/profile';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {FormModal} from '@/components/shared/modals/FormModal';
import ImageForm from '@/components/profile/ImageForm';

const ImageCropper = ({setCroppedImage, croppedImage}: ImageCropperProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='rounded-full bg-gray-300 h-[130px] w-[130px]'>
        <Image
          src={croppedImage}
          alt='profile image'
          height={400}
          width={400}
          className='rounded-full bg-cover h-[130px] w-[130px]'
        />
      </div>

      <PrimaryButton
        buttonText='Edit'
        className='w-[70px] h-[30px] rounded-xs'
        variant={'outline'}
        handleClick={() => setIsFormOpen(true)}
      />

      <FormModal
        title='Choose Image'
        content={[
          <ImageForm
            setIsFormOpen={setIsFormOpen}
            setCroppedImage={setCroppedImage}
          />,
        ]}
        isFormOpen={isFormOpen}
        setIsFormOpen={() => setIsFormOpen(true)}
      />
    </div>
  );
};

export default ImageCropper;
