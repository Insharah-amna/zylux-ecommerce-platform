import {FiX} from 'react-icons/fi';
import PriceFilter from '@/layout/sidebar/filterSidebar/PriceFilter';
import RatingFilter from '@/layout/sidebar/filterSidebar/RatingFilter';
import SearchFilter from '@/layout/sidebar/filterSidebar/SearchFilter';
import CategoryCheck from '@/layout/sidebar/filterSidebar/CategoryFilter';
import PrimaryButton from '../buttons/PrimaryButton';

const FiltersContent = ({...props}: any) => {
  return (
    <div className='flex flex-col gap-4 p-4 rounded-xl bg-gray-50 sticky top-7'>
      <h3 className='font-semibold text-gray-800'>Filter:</h3>

      {props.isResetButtonShown && (
        <div>
          <PrimaryButton
            buttonText={
              <span className='flex items-center gap-2'>
                <FiX />
                Reset Filters
              </span>
            }
            className='rounded-md w-full bg-gray-800 hover:bg-accent'
            handleClick={() => {
              props.resetAllFilters();
              props.setCategories([]);
              props.setPrice([0, 30000]);
              props.setRatings([]);
            }}
          />
        </div>
      )}

      <SearchFilter
        searchValue={props.search}
        setSearchValue={props.setSearch}
        handleSearch={props.handleSearch}
      />

      <PriceFilter
        values={[props.price[0], props.price[1]]}
        setValues={props.setPrice}
      />

      <CategoryCheck
        categoryList={props.categoryList}
        isCategoriesLoading={props.isCategoriesLoading}
        categories={props.categories}
        handleCheckboxChange={props.handleCheckboxChange}
      />

      <RatingFilter
        ratings={props.ratings}
        handleRatingChange={props.handleRatingChange}
      />
    </div>
  );
};

export default FiltersContent;
