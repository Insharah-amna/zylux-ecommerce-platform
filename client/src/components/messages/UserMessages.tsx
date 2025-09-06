'use client';
import Link from 'next/link';
import {MESSAGE_ROUTE} from '@/utils/PATHS';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {UserMessage} from '@/types/messages';
import {useGetUsersMessagesQuery} from '@/redux/slices/messages/messagesApi';

const UserMessages = () => {
  const {data, isLoading} = useGetUsersMessagesQuery();
  const usersList = data?.body?.usersList ?? [];

  if (isLoading) return <ComponentLoader />;

  if (usersList?.length === 0)
    return (
      <div className='flex-center h-[80vh] text-gray-500'>
        No customer messages at the moment.
      </div>
    );

  return (
    <div className='mx-auto px-14 py-8'>
      <h2 className='text-2xl font-semibold mb-4'>Customer Messages</h2>
      <div>
        {usersList.map((user: UserMessage) => (
          <Link
            href={`${MESSAGE_ROUTE(user.lastMessage.sender._id)}`}
            key={user._id}
          >
            <div className='bg-gray-100 rounded-sm px-3 py-2 my-3 cursor-pointer flex flex-col'>
              <span className='text-xs text-gray-600'>
                {user.lastMessage.sender.email}
              </span>
              <span>{user.lastMessage.message}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserMessages;
