import Link from 'next/link';
import {FiMessageCircle} from 'react-icons/fi';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/users/usersSlice';
import {MESSAGE_ROUTE} from '@/utils/PATHS';

const ChatWithSeller = () => {
  const user = useSelector(getCurrentUser);

  if (!user) {
    return <p className='text-accent text-sm'>User is not logged in</p>;
  }

  return (
    <div className='flex justify-end'>
      <Link href={MESSAGE_ROUTE(user._id)}>
        <div className='bg-accent px-4 py-2 rounded-full flex-center gap-2 text-white cursor-pointer hover:shadow-md transition'>
          <p>Chat with Seller</p>
          <FiMessageCircle size={24} />
        </div>
      </Link>
    </div>
  );
};

export default ChatWithSeller;
