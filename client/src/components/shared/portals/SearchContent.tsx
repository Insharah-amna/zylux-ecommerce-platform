import {useState} from 'react';
import {createPortal} from 'react-dom';
import {SearchbarContentProps} from '@/interfaces/portals';
import {LiaTimesSolid} from 'react-icons/lia';
import useSideContentExpand from '@/hooks/useSideContentExpand';
import SearchFilter from '@/layout/sidebar/filterSidebar/SearchFilter';

const SearchContent = ({open, setOpen}: SearchbarContentProps) => {
  const {shouldExpand} = useSideContentExpand({open});

  const [searchValue, setSearchValue] = useState('');

  return createPortal(
    <div
      className={`${
        open ? 'block' : 'hidden'
      } transition-all min-h-screen w-full bg-black/30 absolute top-0 z-[999]`}
    >
      <div
        className={`absolute left-0 min-h-screen transition-all duration-400 ease-in-out ${
          shouldExpand ? 'w-[400px] py-6 px-4' : 'w-0 overflow-hidden py-0 px-0'
        }  bg-white`}
      >
        <button
          onClick={() => setOpen(false)}
          className='cursor-pointer text-xl'
        >
          <LiaTimesSolid />
        </button>

        {/* <SearchFilter
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={}
        /> */}
      </div>
    </div>,
    document.body
  );
};

export default SearchContent;
