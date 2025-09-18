'use client';
import {useState} from 'react';
import Image from 'next/image';
import {useSelector} from 'react-redux';
import {getDate} from '@/utils/dateUtils';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import {FormModal} from '@/components/shared/modals/FormModal';
import ProfileForm from './ProfileForm';
import {getCurrentUser} from '@/redux/slices/users/usersSlice';
import UserNotLoggedIn from './UserNotLoggedIn';

const Profile = () => {
  const user = useSelector(getCurrentUser);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const todayDate = getDate();

  if (!user) return <UserNotLoggedIn />;

  return (
    <div className='flex flex-col gap-6'>
      <div className='px-4'>
        <h2 className='text-lg font-semibold mb-1'>
          Welcome, {`${user.firstName}`}
        </h2>
        <p className='text-sm text-gray-500'>{todayDate}</p>
      </div>

      <div className='flex justify-between items-center rounded-md bg-gray-50 p-6'>
        <div className='flex gap-5'>
          <Image
            src={user?.profileImage!}
            alt='user profile'
            height={400}
            width={400}
            className='h-[70px] w-[70px] rounded-full'
          />

          <div className='h-[70px] flex flex-col gap-1 justify-center'>
            <h3 className='text-lg font-semibold'>{`${user.firstName} ${user.lastName}`}</h3>
            <p className='text-sm text-gray-500'>{`${user.email}`}</p>
          </div>
        </div>

        <div>
          <PrimaryButton
            buttonText='Edit'
            className='bg-accent/90 hover:bg-accent rounded-sm text-white text-sm w-[70px]'
            handleClick={() => setIsFormOpen(true)}
          />
        </div>
      </div>

      <FormModal
        title='Profile'
        content={[<ProfileForm setIsFormOpen={setIsFormOpen} />]}
        isFormOpen={isFormOpen}
        setIsFormOpen={() => setIsFormOpen(true)}
      />
    </div>
  );
};

export default Profile;
