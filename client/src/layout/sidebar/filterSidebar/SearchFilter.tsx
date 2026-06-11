import {FiSearch} from 'react-icons/fi';
import {SearchFilterProps} from '@/interfaces/shop';

const SearchFilter = ({
  searchValue,
  setSearchValue,
  handleSearch,
}: SearchFilterProps) => {
  return (
    <div className='flex justify-between bg-gray-100 rounded-full py-2 px-4 items-center'>
      <input
        type='text'
        placeholder='Search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className='outline-none'
      />

      <button onClick={() => handleSearch(searchValue)} className='p-1'>
        <FiSearch className='cursor-pointer' />
      </button>
    </div>
  );
};

export default SearchFilter;
