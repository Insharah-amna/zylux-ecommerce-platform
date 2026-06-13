import {FiSearch, FiX} from 'react-icons/fi';
import {TableSearchInputProps} from '@/interfaces/input';
import PrimaryButton from '../buttons/PrimaryButton';

const TableSearchInput = ({
  search,
  setSearch,
  handleSearch,
  resetFilters,
  isResetButtonShown,
}: TableSearchInputProps) => {
  return (
    <div className='flex items-start gap-3'>
      <div className='bg-gray-100 rounded-sm p-1 mb-3 w-[270px] flex-between'>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='outline-none px-2'
        />
        <button
          onClick={() => handleSearch(search)}
          className={`cursor-pointer p-2 bg-primary text-white rounded-sm ${search?.length === 0 ? 'opacity-60' : ''}`}
          disabled={search?.length === 0}
        >
          <FiSearch color='white' />
        </button>
      </div>

      {isResetButtonShown && (
        <div>
          <PrimaryButton
            buttonText={
              <span className='flex items-center gap-2'>
                <FiX />
                Reset
              </span>
            }
            className='rounded-sm '
            handleClick={resetFilters}
          />
        </div>
      )}
    </div>
  );
};

export default TableSearchInput;
