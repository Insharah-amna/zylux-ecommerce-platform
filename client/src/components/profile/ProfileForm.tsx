'use client';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {ProfileFormProps, ProfileFormValues} from '@/interfaces/profile';
import {profileSchema} from '@/schemas/dashboard';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import SubmitButton from '@/components/shared/buttons/SubmitButton';
import TextInput from '@/components/shared/inputs/TextInput';
import {dispatch} from '@/redux/store';
import {actions, getCurrentUser} from '@/redux/slices/users/usersSlice';
import {useUpdateUserProfileMutation} from '@/redux/slices/profile/profileApi';
import ImageCropper from '@/components/shared/imageCropper';

const ProfileForm = ({setIsFormOpen}: ProfileFormProps) => {
  const user = useSelector(getCurrentUser);

  const {control, handleSubmit} = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      profileImage: user?.profileImage,
    },
    resolver: yupResolver(profileSchema),
  });

  const [croppedImage, setCroppedImage] = useState<[string, File | null]>([
    user?.profileImage!,
    null,
  ]);

  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation();

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append(
      'data',
      JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
      })
    );

    if (croppedImage[1]) {
      formData.append('file', croppedImage[1]);
    }

    dispatch(
      actions.updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: croppedImage[0],
      })
    );

    updateProfile(formData);
    setIsFormOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center justify-between h-[480px] p-4'
    >
      <div className='max-h-[200px] max-w-[200px] relative'>
        <ImageCropper
          setCroppedImage={setCroppedImage}
          croppedImage={croppedImage[0] || user?.profileImage!}
        />
      </div>

      <div className='flex flex-col gap-4 w-full mb-4'>
        <TextInput
          type='text'
          name='firstName'
          label='First name'
          placeholder='Enter first name'
          control={control}
          className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
        />
        <TextInput
          type='text'
          name='lastName'
          label='Last name'
          placeholder='Enter last name'
          control={control}
          className='flex-1 p-2 rounded-sm focus-visible:ring-cyan-900'
        />
      </div>

      <div className='flex gap-4'>
        <PrimaryButton
          buttonText='Cancel'
          handleClick={() => setIsFormOpen(false)}
          className='h-[36px] rounded-[8px]'
          variant='outline'
        />
        <SubmitButton
          buttonText={'Save'}
          className='rounded-md hover:bg-accent'
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
