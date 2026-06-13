'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/users/usersSlice';
import {MESSAGE_ROUTE} from '@/utils/PATHS';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {UserMessage} from '@/types/messages';
import {useGetUsersMessagesQuery} from '@/redux/slices/messages/messagesApi';
import {socketService} from '@/utils/socketUtils';

const UserMessages = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const {data, isLoading} = useGetUsersMessagesQuery();
  const usersList = data?.body?.usersList ?? [];

  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (currentUser?._id) {
      socketService.connect(currentUser._id);
    }

    const handleOnlineUsers = (users: string[]) => {
      const filteredUsers = users.filter((id) => id !== socketService.ADMIN_ID);
      setOnlineUsers(filteredUsers);
    };

    socketService.onOnlineUsers(handleOnlineUsers);

    return () => {
      socketService.offOnlineUsers(handleOnlineUsers);
      if (currentUser?._id) {
        socketService.disconnect(currentUser._id);
      }
    };
  }, [currentUser?._id]);

  if (isLoading) return <ComponentLoader />;

  return (
    <div className='mx-auto px-10 py-8'>
      <div className='flex gap-10 min-h-[75vh]'>
        <div className='w-1/3 pr-10 border-r-1 border-gray-300'>
          <div className='flex justify-between'>
            <h1 className='text-green-600 text-xl font-semibold'>
              Online Users
            </h1>
            <span className='text-primary font-normal text-lg'>{` ${onlineUsers.length}`}</span>
          </div>

          {onlineUsers.length === 0 && (
            <div className='flex-center h-[70vh] text-gray-500'>
              No online users at the moment.
            </div>
          )}

          {onlineUsers.map((userId: string) => (
            <Link href={`${MESSAGE_ROUTE(userId)}`} key={userId}>
              <div className='bg-gray-100 rounded-sm px-3 py-2 my-3 cursor-pointer flex flex-col'>
                <span className='text-xs text-gray-700'>{userId}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className='w-2/3'>
          <h2 className='text-xl font-semibold'>User Messages</h2>

          {usersList.length === 0 && (
            <div className='flex-center h-[80vh] text-gray-500'>
              No customer messages at the moment.
            </div>
          )}

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
    </div>
  );
};

export default UserMessages;
