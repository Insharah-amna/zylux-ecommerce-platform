import Link from 'next/link';
import {useDispatch} from 'react-redux';
import {FiUser} from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {PROFILE_PATHS} from '@/utils/PATHS';
import {actions} from '@/redux/slices/users/usersSlice';

const ProfileDropdown = () => {
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`block gap-1 cursor-pointer focus:ring-0`}>
          <FiUser className='hover:text-gray-700' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Link href={PROFILE_PATHS.profile}>
          <DropdownMenuItem className='cursor-pointer'>
            My Profile
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onClick={() => dispatch(actions.resetUsersSlice())}
          className='cursor-pointer'
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
